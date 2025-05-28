import {Skeleton} from "moti/skeleton";
import React, {useState, useMemo} from 'react';
import {useLocalSearchParams} from 'expo-router';
import {useTheme} from "@/core/contexts/ThemeContext";
import {getCandidate} from "@/core/queries/useCandidates";
import {ThemedText} from "@/components/Themed/ThemedText";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {CandidateApiData as Candidate} from "@/core/types/Election";
import {ScrollView, useWindowDimensions, View, Image} from "react-native";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";


const CandidateModal = () => {
	const {themeMode} = useTheme();
	const {candidateId} = useLocalSearchParams<{ candidateId: string }>();
	const {data: candidate, isLoading} = getCandidate(candidateId);
	
	if (isLoading) {
		return (
			<ThemedSafeAreaView>
				<View className='px-4 flex-1'>
					<Skeleton.Group show={isLoading}>
						<View className='gap-3 mt-10'>
							<Skeleton height={40} width="70%" colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
							<Skeleton height={20} width="50%" colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
							<Skeleton height={200} width="100%" radius={12}
									  colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
						</View>
						<View className='mt-8'>
							<Skeleton height={300} width="100%" colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
						</View>
					</Skeleton.Group>
				</View>
			</ThemedSafeAreaView>
		);
	}
	
	if (!candidate || !candidate.data) {
		return (
			<ThemedSafeAreaView>
				<View className='flex-1 items-center justify-center px-4'>
					<ThemedText type='subtitle'>Candidate not found</ThemedText>
				</View>
			</ThemedSafeAreaView>
		);
	}
	
	return (
		<ThemedSafeAreaView>
			<View className='px-4'>
				{/*Header*/}
				<View className='gap-3'>
					<View className='mt-10'>
						<ThemedText type='title'>
							{candidate.data.name}
						</ThemedText>
						<ThemedText type='light'>
							{candidate.data.department}, {candidate.data.level} lvl
						</ThemedText>
					</View>
					<Image
						source={{uri: candidate.data.imageUrl}}
						className='h-[200px] rounded-xl bg-neutral-200'
						resizeMode="cover"
					/>
				</View>
			</View>
			{/*Manifesto and the rest*/}
			<View className='flex-1 flex-grow pt-8'>
				<ViewArea candidate={candidate.data}/>
			</View>
		</ThemedSafeAreaView>
	);
};

const ProfileRoute = ({candidate}: { candidate: Candidate }) => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
		showsVerticalScrollIndicator={false}
	>
		<View className='gap-6'>
			<View>
				<ThemedText type='subtitle' className='mb-2'>About Me</ThemedText>
				<ThemedText>{candidate.bio || candidate.profile || "No bio available"}</ThemedText>
			</View>
			
			<View>
				<ThemedText type='subtitle' className='mb-2'>Academic Information</ThemedText>
				<ThemedText>Department: {candidate.department}</ThemedText>
				<ThemedText>Level: {candidate.level}</ThemedText>
			</View>
			
			{candidate.achievements && candidate.achievements.length > 0 && (
				<View>
					<ThemedText type='subtitle' className='mb-2'>Achievements</ThemedText>
					{candidate.achievements.map((achievement, index) => (
						<ThemedText key={index} className='mb-1'>• {achievement}</ThemedText>
					))}
				</View>
			)}
		</View>
	</ScrollView>
);

const ManifestoRoute = ({candidate}: { candidate: Candidate }) => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
		showsVerticalScrollIndicator={false}
	>
		<View className='gap-4'>
			<ThemedText type='subtitle'>My Vision</ThemedText>
			<ThemedText className='leading-6'>
				{candidate.manifesto || "No manifesto available"}
			</ThemedText>
		</View>
	</ScrollView>
);

const CampaignRoute = ({candidate}: { candidate: Candidate }) => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
		showsVerticalScrollIndicator={false}
	>
		<View className='gap-6'>
			<View>
				<ThemedText type='subtitle' className='mb-3'>Campaign Promises</ThemedText>
				{candidate.campaignPromises && candidate.campaignPromises.length > 0 ? (
					candidate.campaignPromises.map((promise, index) => (
						<View key={index} className='mb-3 flex-row'>
							<ThemedText className='mr-2'>•</ThemedText>
							<ThemedText className='flex-1'>{promise}</ThemedText>
						</View>
					))
				) : (
					<ThemedText>No campaign promises available</ThemedText>
				)}
			</View>
			
			<View>
				<ThemedText type='subtitle' className='mb-2'>Why Vote For Me?</ThemedText>
				<ThemedText className='leading-6'>
					{candidate.profile || "I am committed to serving the student body with dedication and integrity."}
				</ThemedText>
			</View>
		</View>
	</ScrollView>
);

const ViewArea = ({candidate}: { candidate: Candidate }) => {
	const layout = useWindowDimensions();
	const {colors} = useTheme();
	
	// Theme colors
	const backgroundColor = colors.background;
	const primaryColor = colors.primary;
	const secondaryColor = "#95a5a6";
	
	// Tab state
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{key: 'profile', title: 'Profile'},
		{key: 'manifesto', title: 'Manifesto'},
		{key: 'campaign', title: 'Campaign'},
	]);
	
	// Create scene map with candidate data
	const renderScene = useMemo(() =>
		SceneMap({
			profile: () => <ProfileRoute candidate={candidate}/>,
			manifesto: () => <ManifestoRoute candidate={candidate}/>,
			campaign: () => <CampaignRoute candidate={candidate}/>,
		}), [candidate]
	);
	
	// Custom tab bar
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{height: 3, backgroundColor: primaryColor}}
			style={{backgroundColor, width: '90%', alignSelf: 'center'}}
			activeColor={primaryColor}
			inactiveColor={secondaryColor}
			labelStyle={{textTransform: 'capitalize'}}
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
};

export default CandidateModal;