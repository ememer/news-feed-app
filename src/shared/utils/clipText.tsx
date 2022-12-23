export const dumpyText = `Sweet roll soufflé candy canes topping halvah dessert gingerbread. Apple pie donut cookie biscuit apple pie croissant shortbread. Lollipop pastry soufflé chupa chups gummi bears dessert pastry. Powder marshmallow candy pie marshmallow chocolate cake cake. Cupcake sesame snaps apple pie croissant gummies danish candy biscuit. Tootsie roll tootsie roll chocolate icing soufflé. Chocolate cake marzipan bear claw jujubes shortbread dessert soufflé. Chocolate danish brownie biscuit dessert cake sweet roll. Apple pie cheesecake dessert jelly beans croissant macaroon cotton candy gummies topping. Topping marshmallow candy jelly lollipop tiramisu cupcake candy canes pie. Sesame snaps dessert bear claw tart muffin pie. Marshmallow dragée apple pie carrot cake lemon drops croissant apple pie icing. Biscuit brownie gummies ice cream dragée dessert jelly-o tootsie roll. Bear claw tootsie roll ice cream dessert croissant.`;

export const clipLongText = (text: string, breakPoint: number): string => {
  const shouldBeClipped = text.length > breakPoint ?? text;

  if (shouldBeClipped) {
    const whiteSpaceIndex = text.slice(0, breakPoint).lastIndexOf(' ');
    return `${text.slice(0, whiteSpaceIndex)}...`;
  }

  return text;
};
