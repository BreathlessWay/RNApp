import React, { FC, ReactNode, useState } from 'react';

import { Animated } from 'react-native';

import MenuListItem from 'trending/components/common/MenuListItem';

import Style from './style';

const ANIMATE_TIME = 300;

export type AnimateSliderComponentPropType = {
	theme: string;
	height: number;
	title: string;
	Icons: ReactNode;
	icon: string;
};

const AnimateSliderComponent: FC<AnimateSliderComponentPropType> = (props) => {
	const { height, children, theme, title, Icons, icon } = props;

	const [initialHeight] = useState(new Animated.Value(0)),
		[toHeight, setToHeight] = useState(height);

	return (
		<>
			<MenuListItem
				themeColor={theme}
				name={title}
				Icons={Icons}
				icon={icon}
				onPress={() =>
					Animated.timing(
						// 随时间变化而执行动画
						initialHeight, // 动画中的变量值
						{
							toValue: toHeight, // 透明度最终变为1，即完全不透明
							duration: ANIMATE_TIME, // 让动画持续一段时间
						},
					).start(() => {
						toHeight ? setToHeight(0) : setToHeight(height);
					})
				}
				column={true}
			/>
			<Animated.View style={{ height: initialHeight }}>
				{children}
			</Animated.View>
		</>
	);
};

export default AnimateSliderComponent;
