import {Skeleton} from "moti/skeleton";
import {useTheme} from "@/core/contexts/ThemeContext";
import React, {useMemo, useState} from 'react';
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {Link, router, useLocalSearchParams} from 'expo-router';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {ScrollView, useWindowDimensions, View} from "react-native";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {getElection, getPositionsAndCandidates} from "@/core/queries/useElections";

const Index = () => {
	const {id} = useLocalSearchParams<{ id: string }>();
	const {data, isLoading} = getElection(id)
	const {colors, themeMode} = useTheme()
	const {data: posCandid} = getPositionsAndCandidates(id);
	
	return (
		<ThemedSafeAreaView>
			<View className="pt-3 px-4 gap-8">
				<Skeleton.Group show={isLoading}>
					<Skeleton height={50} colorMode={themeMode === 'dark' ? 'dark' : 'light'}>
						<ThemedText type='title'>
							{data?.election?.title}
						</ThemedText>
					</Skeleton>
					<Skeleton height={80} colorMode={themeMode === 'dark' ? 'dark' : 'light'}>
						<View className='flex-row justify-between items-center'>
							<View className='gap-2'>
								<View className='flex-row items-center gap-2'>
									<MaterialCommunityIcons name="vote-outline" size={24} color={colors.text}/>
									<ThemedText>Total votes</ThemedText>
								</View>
								<View>
									<ThemedText type='title'>
										{data?.election?.totalVotes}
										<ThemedText>{" "}votes</ThemedText>
									</ThemedText>
								</View>
							</View>
							<View>
								{data?.election?.dateBasedStatus === 'ongoing' && (
									<ThemedButton
										variant='primary'
										title="Vote"
										className='rounded-[999px] min-w-0 p-0 m-0 w-[78px] h-[50px]'
										onPress={() => router.push('/(protected)/election/voting-rules')}
									/>
								)}
							</View>
						</View>
					</Skeleton>
				</Skeleton.Group>
			</View>
			<View className='flex-1  pt-8'>
				{isLoading ? (
					<View className='px-4 flex-1 flex-grow'>
						<Skeleton height={'100%'} width='100%' colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
					</View>
				) : (<ViewArea/>)}
			</View>
		</ThemedSafeAreaView>
	);
};

// Component for a candidate on live result
const LiveResultCandidate = ({name, votes, position}: { name: string, votes: number, position: number }) => {
	// Helper function to get ordinal suffix
	const getSuffix = (number: number): string => {
		const lastDigit = number % 10;
		const lastTwoDigits = number % 100;
		
		if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
			return 'th';
		}
		
		switch (lastDigit) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	
	return (
		<View
			className='flex-row justify-between items-center border border-primary-light dark:border-primary-dark p-4 rounded-xl'>
			<View className='flex-row gap-3 items-center'>
				<View className='bg-neutral-100 rounded-xl w-16 h-16 items-center gap-2'></View>
				<View>
					<ThemedText type='subtitle'>{name}</ThemedText>
					<ThemedText>Votes: {votes}</ThemedText>
				</View>
			</View>
			<View className='flex-row items-start'>
				<ThemedText
					type='subtitle'
					className='dark:text-primary-light text-primary-light'
				>
					{position}
				</ThemedText>
				<ThemedText
					className='font-montserrat-medium dark:text-primary-light text-primary-light -top-1'
				>
					{getSuffix(position)}
				</ThemedText>
			</View>
		</View>
	)
}

const Candidate = ({name}: { name: string }) => {
	return (
		<Link href='/election/candidate-modal'>
			<View
				className='flex-row justify-between items-center border border-primary-light dark:border-primary-dark p-4 rounded-xl w-full'>
				<View className='flex-row gap-3 items-center'>
					<View className='bg-neutral-100 rounded-xl w-16 h-16 items-center gap-2'></View>
					<View>
						<ThemedText type='subtitle'>{name}</ThemedText>
					</View>
				</View>
			</View>
		</Link>
	)
}

// Component for Live result tab content
const LiveResultRoute = () => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingBlock: 30, paddingInline: 16}}
		showsVerticalScrollIndicator={false}
	>
		<View className='gap-6'>
			<ThemedText
				type='subtitle'
				className='text-primary-light dark:text-primary-dark'
			>
				Presidential
			</ThemedText>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={1}/>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={2}/>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={3}/>
			<ThemedText
				type='subtitle'
				className='text-primary-light dark:text-primary-dark'
			>
				Vice-President
			</ThemedText>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={1}/>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={2}/>
			<LiveResultCandidate name={'Destiny Ezenwata'} votes={1200} position={3}/>
		</View>
	</ScrollView>
);

// Component for Candidates tab content
const CandidatesRoute = () => (
	<ScrollView
		bounces={false}
		contentContainerStyle={{paddingBlock: 30, paddingInline: 16}}
		showsVerticalScrollIndicator={false}
	>
		<View className='gap-6'>
			<ThemedText
				type='subtitle'
				className='text-primary-light dark:text-primary-dark'
			>
				Presidential
			</ThemedText>
			<Candidate name={'Destiny Ezenwata'}/>
			<Candidate name={'Destiny Ezenwata'}/>
			<Candidate name={'Destiny Ezenwata'}/>
			<ThemedText
				type='subtitle'
				className='text-primary-light dark:text-primary-dark'
			>
				Vice-President
			</ThemedText>
			<Candidate name={'Destiny Ezenwata'}/>
			<Candidate name={'Destiny Ezenwata'}/>
			<Candidate name={'Destiny Ezenwata'}/>
		</View>
	</ScrollView>
);

const renderScene = SceneMap({
	liveResult: LiveResultRoute,
	candidates: CandidatesRoute,
})

const ViewArea = () => {
	const {id} = useLocalSearchParams<{ id: string }>();
	const {data} = getElection(id)
	
	const {colors} = useTheme();
	const layout = useWindowDimensions();
	
	// Get theme colors (adjust based on your actual theming system)
	const backgroundColor = colors.background;
	const primaryColor = colors.primary;
	const secondaryColor = "#95a5a6";
	
	// Tab state
	const [index, setIndex] = useState(0);
	
	const routes = useMemo(() => {
		if (data?.election?.dateBasedStatus === 'upcoming') {
			return [
				{key: 'candidates', title: 'Candidates'},
			];
		} else {
			return [
				{key: 'liveResult', title: 'Live Result'},
				{key: 'candidates', title: 'Candidates'},
			];
		}
	}, [data?.election?.dateBasedStatus]);
	
	// Custom tab bar
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{height: 3, backgroundColor: primaryColor}}
			style={{
				backgroundColor,
				width: data?.election?.dateBasedStatus == 'upcoming' ? '50%' : '80%',
				alignSelf: 'center'
			}}
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
			// pagerStyle={{paddingTop: 25}}
		/>
	);
	
}
export default Index;