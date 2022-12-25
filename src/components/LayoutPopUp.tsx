import clsx from 'clsx';
import React, { useEffect } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
interface Props {
  children: React.ReactNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}
const theme = layoutTheme[0];
const LayoutPopUp = ({ children, onClose, className }: Props) => {
  const closePopup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', (e) => closePopup(e));
    return () => removeEventListener('keyup', closePopup);
  });

  return (
    <div
      id="Popup"
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === 'Popup') {
          onClose(false);
        }
      }}
      className={clsx(
        'h-90-s fixed top-0 left-0  z-50 flex h-full  w-full items-center justify-center overflow-y-auto bg-hot-ping-900 bg-opacity-30 bg-clip-padding  backdrop-blur-sm backdrop-filter',
        theme.mainText,
      )}
    >
      <div
        className={clsx(
          'mt-5 max-h-90-s w-full  gap-5 overflow-y-scroll rounded-lg border p-10 shadow-lg lg:w-4/6',
          className,
          theme.borderB,
          theme.elementsLinearBG,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutPopUp;
