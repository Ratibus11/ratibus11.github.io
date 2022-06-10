function get(element: HTMLElement, attribute: string) {
	return getComputedStyle(element)[attribute as any];
}

export { get };
