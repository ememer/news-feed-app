export const clipLongText = (text: string, breakPoint: number): string => {
  const shouldBeClipped = text.length > breakPoint;

  if (shouldBeClipped) {
    const whiteSpaceIndex = text.slice(0, breakPoint).lastIndexOf(' ');
    return `${text.slice(0, whiteSpaceIndex)}...`;
  }

  return text;
};
