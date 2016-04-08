// Type definitions for dragula v3.6.8
// Project: http://bevacqua.github.io/dragula/
// Definitions by: Paul Welter <https://github.com/pwelter34/>,
//                 John Gozde <https://github.com/jgoz/>
// Definitions: https://github.com/jgoz/typed-dragula

interface DragulaOptions {

    /**
     * Setting this option is effectively the same as passing the containers in the first argument to dragula(containers, options).
     */
    containers?: Element[];

    /**
     * Returning 'true' will indicate that the given element is a drake container.
     */
    isContainer?: (el?: Element) => boolean;

    /**
     * Invoked whenever an element is clicked.
     * If this method returns false, a drag event won't begin, and the event won't be prevented either.
     * @param el
     *     Element that is being dragged.
     * @param source
     *     Drag source container element.
     * @param handle
     *     Element that triggered the click event.
     * @param sibling
     *     Element that follows 'el' or 'null' if 'el' was the last item in the container.
     */
    moves?: (el?: Element, source?: Element, handle?: Element, sibling?: Element) => boolean;

    /**
     * Returning 'true' will indicate that an element can be dropped on a target container.
     * @param el
     *     Element being dragged.
     * @param target
     *     Drop target container element.
     * @param source
     *     Drag source container element.
     * @param sibling
     *     Element that would come after the dragged element, or 'null' if the element
     *     is being dropped at the end of the container.
     */
    accepts?: (el?: Element, target?: Element, source?: Element, sibling?: Element) => boolean;

    /**
     * If true, or a function that returns true, items will be copied rather than moved.
     * If a method is passed, it will be called whenever an element starts being dragged
     * in order to decide whether it should be copied.
     */
    copy?: boolean | ((el?: Element, source?: Element) => boolean);

    /**
     * If true (and if 'copy' is/returns true), users may sort elements in source containers.
     */
    copySortSource?: boolean;

    /**
     * If true, elements dropped outside of any approved containers are moved back to the source
     * element where the drag event began, rather than staying at the drop position previewed by
     * the feedback shadow.
     */
    revertOnSpill?: boolean;

    /**
     * If true, elements dropped outside of any approved containers are removed from the DOM.
     */
    removeOnSpill?: boolean;

    /**
     * Determines which axis to consider when dropping an element in a container.
     * If the direction is 'vertical', the Y axis will be considered. Otherwise,
     * if the direction is 'horizontal', the X axis will be considered.
     * @default "vertical"
     */
    direction?: "vertical" | "horizontal";

    /**
     * Returning 'true' will indicate that an element should not trigger a drag.
     * @param el
     *     Element that would be dragged.
     * @param handle
     *     Element that was clicked.
     */
    invalid?: (el?: Element, handle?: Element) => boolean;

    /**
     * The DOM element where the mirror element displayed while dragging will be appended to.
     * @default document.body
     */
    mirrorContainer?: Element;

    /**
     * If true, clicking on an input element will not begin a drag operation until the cursor exits the input.
     * @default true
     */
    ignoreInputTextSelection?: boolean;

}

type DrakeEventType = "drag" | "dragend" | "drop" | "cancel" | "remove" | "shadow" | "over" | "out" | "cloned";

interface Drake {

    /**
     * Collection of containers passed to dragula when building this drake instance.
     * Containers may be added or removed from here after construction.
     */
    containers: Element[];

    /**
     * Will be true whenever an element is being dragged.
     */
    dragging: boolean;

    /**
     * Enter drag mode without a shadow.
     * Can be used to provide keyboard shortcuts to an existing drag/drop solution.
     * @param item
     *     Element to begin dragging.
     */
    start(item: Element): void;

    /**
     * Gracefully end the drag event.
     * The last position marked by the preview shadow will be used as the drop target.
     */
    end(): void;

    /**
     * Gracefully cancel the current drag action, if any.
     * @param revert?
     *     Overrides the behaviour of the 'revertOnSpill' option.
     */
    cancel(revert?: boolean): void;

    /**
     * Gracefully remove the element currently being dragged, if any.
     */
    remove(): void;

    /**
     * Attach an event handler to the drake instance.
     * @param type
     *     Event name.
     * @param listener
     *     Event handler.
     */
    on(type: DrakeEventType, listener: Function): void;

    /**
     * Removes all drag and drop events used by dragula to manage drag and drop between the containers.
     */
    destroy(): void;

}

interface Dragula {

    /**
     * Initialize dragula on the given containers with the specified options.
     *
     * By default, dragula will allow the user to drag an element in any of the
     * containers and drop it in any other container in the list. If the element
     * is dropped anywhere that's not one of the containers, the event will be
     * gracefully cancelled according to the revertOnSpill and removeOnSpill options.
     *
     * @param containers?
     *     Container element(s) that will become drag/drop targets.
     * @param options?
     *     Options controlling the drag/drop behaviour.
     * @returns
     *     Drake instance for controlling the drag/drop behaviour programmatically.
     */
    (containers?: (Element|Element[]), options?: DragulaOptions): Drake;

    /**
     * Initialize dragula with the specified options.
     *
     * By default, dragula will allow the user to drag an element in any of the
     * containers and drop it in any other container in the list. If the element
     * is dropped anywhere that's not one of the containers, the event will be
     * gracefully cancelled according to the revertOnSpill and removeOnSpill options.
     *
     * @param options
     *     Options controlling the drag/drop behaviour.
     * @returns
     *     Drake instance for controlling the drag/drop behaviour programmatically.
     */
    (options: DragulaOptions): Drake;

}

declare const dragula: Dragula;
export = dragula;
