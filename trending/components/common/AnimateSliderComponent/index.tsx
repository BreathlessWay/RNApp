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
							// 只能使用到只有非布局相关的动画属性上，例如 transform 和 opacity。布局相关的属性，比如说 height 和 position 相关的属性，开启后会报错
							// useNativeDriver: true  // 开启后所有的动画都会在 Native 线程运行，动画就会变的非常丝滑顺畅。
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
