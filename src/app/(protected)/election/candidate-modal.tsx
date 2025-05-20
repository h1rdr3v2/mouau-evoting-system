import React, {useState} from 'react';
import {ScrollView, useWindowDimensions, View} from "react-native";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {ThemedText} from "@/components/ThemedText";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {useTheme} from "@/core/contexts/ThemeContext";

const CandidateModal = () => {
	return (
		<ThemedSafeAreaView>
			<View className='px-4'>
				{/*Header*/}
				<View className='gap-3'>
					<View className='mt-10'>
						<ThemedText type='title'>
							Destiny Ezenwata
						</ThemedText>
						<ThemedText type='light'>
							Computer Science, 400 lvl
						</ThemedText>
					</View>
					<View className='h-[200px] rounded-xl  bg-neutral-600'></View>
				</View>
			</View>
			{/*Manefesto and the rest*/}
			<View className='flex-1 flex-grow pt-8'>
				<ViewArea/>
			</View>
		</ThemedSafeAreaView>
	);
};

const genericLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt diam et neque rhoncus, et\n" +
	"\t\t\tconsequat magna interdum. Nunc quis mi nec augue sodales aliquam nec vitae nisl. Aliquam erat volutpat.\n" +
	"\t\t\tSuspendisse condimentum tempor sagittis. Donec cursus vestibulum nisi. Donec ultricies metus nulla, sit amet\n" +
	"\t\t\tsuscipit elit venenatis ultrices. Nullam porttitor nisi risus, in suscipit massa lobortis non. Nunc\n" +
	"\t\t\tconsectetur finibus lorem et elementum. Aenean in velit tempus, porttitor nisi nec, placerat tellus. Donec\n" +
	"\t\t\tornare sem ac ex consectetur hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices\n" +
	"\t\t\tposuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia\n" +
	"\t\t\tcurae; Donec pharetra mi leo. Morbi suscipit diam non purus malesuada imperdiet. Vestibulum id condimentum\n" +
	"\t\t\tvelit. Vestibulum tristique libero lacus, sed scelerisque enim bibendum in.";

const ProfileRoute = () => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingBlock: 30, paddingInline: 16}}
		showsVerticalScrollIndicator={false}
	>
		<ThemedText>{genericLorem}</ThemedText>
	</ScrollView>
)
const ManefestoRoute = () => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingBlock: 30, paddingInline: 16}}
		showsVerticalScrollIndicator={false}
	>
		<ThemedText>{genericLorem}</ThemedText>
	</ScrollView>
)
const CampaignRoute = () => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingBlock: 30, paddingInline: 16}}
		showsVerticalScrollIndicator={false}
	>
		<ThemedText>{genericLorem}</ThemedText>
	</ScrollView>
)

const renderScene = SceneMap({
	profile: ProfileRoute,
	manefesto: ManefestoRoute,
	campaign: CampaignRoute,
})

const ViewArea = () => {
	const layout = useWindowDimensions();
	
	const {colors} = useTheme();
	
	// Get theme colors (adjust based on your actual theming system)
	const backgroundColor = colors.background;
	const primaryColor = colors.primary;
	const secondaryColor = "#95a5a6";
	
	// Tab state
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{key: 'profile', title: 'Profile'},
		{key: 'manefesto', title: 'Manefesto'},
		{key: 'campaign', title: 'Campaign'},
	]);
	
	// Custom tab bar
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{height: 3, backgroundColor: primaryColor}}
			style={{backgroundColor, width: '80%', alignSelf: 'center'}}
			activeColor={primaryColor}
			inactiveColor={secondaryColor}
		/>
	);
	
	return (
		<TabView
			navigationState={{index, routes}}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{width: layout.width}}
			renderTabBar={renderTabBar}
		/>
	);
}
export default CandidateModal;