declare module 'react-native-parallax-scroll-view' {
	declare class ParallaxScrollView extends React.Component<
		ParallaxScrollViewProps,
		{}
	> {}

	export interface ParallaxScrollViewProps {
		backgroundScrollSpeed?: number;
		backgroundColor?: string;
		contentBackgroundColor?: string;
		fadeOutForeground?: boolean;
		onChangeHeaderVisibility?: (value: boolean) => void;
		renderScrollComponent?: (props: any) => JSX.Element;
		renderBackground?: (params: RenderBackgroundParams) => JSX.Element;
		renderForeground?: () => JSX.Element;
		renderFixedHeader?: () => JSX.Element;
		renderStickyHeader?: () => JSX.Element;
		stickyHeaderHeight?: number;
		contentContainerStyle?: any;
		outputScaleValue?: number;
		style?: any;
		parallaxHeaderHeight?: number;
	}

	export class RenderBackgroundParams {
		fadeOutForeground: any;
		backgroundScrollSpeed: number;
		backgroundColor: string;
		parallaxHeaderHeight: number;
		stickyHeaderHeight: number;
		renderBackground: () => void;
		outputScaleValue: number;
	}

	export default ParallaxScrollView;
}

declare module 'react-native-easy-toast' {
	export interface DURATION {
		LENGTH_SHORT: number;
		FOREVER: number;
	}
	export default class Toast extends React.Component<{
		style?: ViewStyle;
		position?: 'top' | 'center' | 'bottom';
		positionValue?: number;
		fadeInDuration?: number;
		fadeOutDuration?: number;
		opacity?: number;
		textStyle?: ViewStyle;
	}> {
		show: (
			text: string | ReactNode,
			duration?: number,
			callback?: () => void,
		) => void;
		close: (duration?: number) => void;
	}
}

namespace NodeJS {
	interface Global {
		ref: MutableRefObject<Toast | undefined>;
		stackNavigation: any;
		drawerNavigation: any;
	}
}
