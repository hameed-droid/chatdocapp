/**
 * Converts the source info item to a compatible format for both single document and collections source info.
 *
 * @param {Object} sourceInfoItem - The source info item to be converted.
 * @param {string} sourceInfoItem.upload_id - The ID of the uploaded document.
 * @param {Object} sourceInfoItem.rects - The rectangles information of the source info item.
 * @return {Array} The converted source info item in a compatible format.
 */
export const convertSourceInfoItem = (sourceInfoItem) => {
  const { upload_id, rects } = sourceInfoItem;
  const rectObjByPageKey = rects || sourceInfoItem;
  const pages = Object.keys(rectObjByPageKey).map((pageKey) => Number(pageKey));

  return pages.map((page) => {
    return {
      page,
      docId: upload_id,
      rects: [...rectObjByPageKey[page]],
    };
  });
};

/**
 * @typedef SourceInfoItem {Object}
 * @property rects {Object}
 * @property upload_id {string}
 */

/**
 * @typedef SourcesItem {Object}
 * @property docId {string}
 * @property page {number}
 * @property rects {number[][]}
 * @property spreads {Object[]}
 */

/**
 * Translate the sourceInfo data returned by the API
 * @param sourceInfo {SourceInfoItem[]}
 * @returns {SourcesItem[]}
 */
export const convertSourceInfoToSources = (sourceInfo) => {
  const sources = [];
  sourceInfo.forEach((item) => {
    if (!Object.keys(item).length) {
      console.warn('the source info is empty.');
      return;
    }
    const itemsWithPage = convertSourceInfoItem(item);
    let formattedItem = {};
    itemsWithPage.forEach(({ page, docId, rects }, index) => {
      const mainSourcePageInfoIndex = 0;
      const isCurrentMainSourcePage = index === mainSourcePageInfoIndex;
      const itemInfo = {
        page,
        docId,
        rects: [...rects],
      };
      if (isCurrentMainSourcePage) {
        formattedItem = {
          ...itemInfo,
          spreads: [],
        };
        return;
      }
      formattedItem.spreads.push(itemInfo);
    });
    const existedSourceItem = sources.find((source) => {
      const isSamePage = source.page === formattedItem.page;
      const isSameDocId = source.docId === formattedItem.docId;
      return formattedItem.docId ? isSamePage && isSameDocId : isSamePage;
    });
    if (existedSourceItem) {
      existedSourceItem.rects = [
        ...existedSourceItem.rects,
        ...formattedItem.rects,
      ];
      existedSourceItem.spreads = [
        ...existedSourceItem.spreads,
        ...formattedItem.spreads,
      ];
      return;
    }
    sources.push(formattedItem);
  });
  return sources;
};

export function getTextWidth(text, font) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
