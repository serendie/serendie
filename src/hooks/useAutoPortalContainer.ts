import { useRef, useEffect, useState } from "react";

/**
 * ModalDialog/Drawer内にある場合、自動的にそのコンテンツ要素をポータルコンテナとして検出するフック
 *
 * @param portalled - Portalを使用するかどうか
 * @returns triggerRef - トリガー要素に設定するref
 * @returns portalContainerRef - Portalのcontainerプロパティに渡すref
 *
 * @example
 * ```tsx
 * const { triggerRef, portalContainerRef } = useAutoPortalContainer(portalled);
 *
 * <Trigger ref={triggerRef}>...</Trigger>
 * <Portal container={portalContainerRef}>...</Portal>
 * ```
 */
export const useAutoPortalContainer = (portalled: boolean) => {
  const triggerRef = useRef<HTMLElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (!portalled || !triggerRef.current) return;

    // ModalDialog または Drawer のコンテンツ要素を検出
    const modalOrDrawerContent = triggerRef.current.closest(
      '[data-scope="dialog"][data-part="content"], [data-scope="drawer"][data-part="content"]'
    );

    if (modalOrDrawerContent) {
      setPortalContainer(modalOrDrawerContent as HTMLElement);
    }
  }, [portalled]);

  const portalContainerRef = portalContainer
    ? { current: portalContainer }
    : undefined;

  return { triggerRef, portalContainerRef };
};
