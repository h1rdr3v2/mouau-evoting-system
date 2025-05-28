import {Skeleton} from "moti/skeleton";
import React, {useMemo, useState} from 'react';
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {Link, router, useLocalSearchParams} from 'expo-router';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import {Image, ScrollView, useWindowDimensions, View} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {getElection, getPositionsAndCandidates} from "@/core/queries/useElections";
import {PositonCandidateApiResponse, PositionsCandidatesResult} from "@/core/types/Election";


const Index = () => {
	const {id} = useLocalSearchParams<{ id: string }>();
	const {data, isLoading} = getElection(id);
	const {colors, themeMode} = useTheme();
	const {data: posCandid, isLoading: isLoadingCandidates} = getPositionsAndCandidates(id);
	
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
			<View className='flex-1 pt-8'>
				{isLoading || isLoadingCandidates ? (
					<View className='px-4 flex-1 flex-grow'>
						<Skeleton height={'100%'} width='100%' colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
					</View>
				) : (
					<ViewArea positionsData={posCandid?.data}/>
				)}
			</View>
		</ThemedSafeAreaView>
	);
};

// Helper function to get ordinal suffix
const getOrdinalSuffix = (number: number): string => {
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

// Component for a candidate on live result
const LiveResultCandidate = ({candidate, position}: { candidate: PositonCandidateApiResponse; position: number }) => {
	return (
		<View
			className='flex-row justify-between items-center border border-primary-light dark:border-primary-dark p-4 rounded-xl'>
			<View className='flex-row gap-3 items-center'>
				<Image
					source={{uri: candidate.imageUrl}}
					importantForAccessibility={'yes'}
					className='bg-neutral-100 rounded-xl w-16 h-16'
					resizeMode="cover"
				/>
				<View>
					<ThemedText type='subtitle'>{candidate.name}</ThemedText>
					<ThemedText>Votes: {candidate.votes}</ThemedText>
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
					{getOrdinalSuffix(position)}
				</ThemedText>
			</View>
		</View>
	);
};

const CandidateCard = ({candidate}: { candidate: PositonCandidateApiResponse }) => {
	return (
		<Link
			href={{
				pathname: '/election/candidate-modal',
				params: {candidateId: candidate.id}
			}}
		>
			<View
				className='flex-row justify-between items-center border border-primary-light dark:border-primary-dark p-4 rounded-xl w-full'>
				<View className='flex-row gap-3 items-center'>
					<Image
						source={{uri: candidate.imageUrl}}
						className='bg-neutral-100 rounded-xl w-16 h-16'
						resizeMode="cover"
					/>
					<View>
						<ThemedText type='subtitle'>{candidate.name}</ThemedText>
						<ThemedText className='text-sm'>{candidate.department}</ThemedText>
					</View>
				</View>
			</View>
		</Link>
	);
};

// Component for Live result tab content
const LiveResultRoute = ({positionsData}: { positionsData: PositionsCandidatesResult }) => {
	// Sort candidates by votes and get positions
	const positionsWithSortedCandidates = useMemo(() => {
		if (!positionsData) return {};
		
		return Object.entries(positionsData).reduce((acc, [positionName, position]) => {
			acc[positionName] = [...position.candidates].sort((a, b) => b.votes - a.votes);
			return acc;
		}, {} as Record<string, PositonCandidateApiResponse[]>);
	}, [positionsData]);
	
	return (
		<ScrollView
			bounces={false}
			contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
			showsVerticalScrollIndicator={false}
		>
			<View className='gap-6'>
				{Object.entries(positionsWithSortedCandidates).map(([positionName, candidates]) => (
					<React.Fragment key={positionName}>
						<ThemedText
							type='subtitle'
							className='text-primary-light dark:text-primary-dark'
						>
							{positionName}
						</ThemedText>
						{candidates.map((candidate, index) => (
							<LiveResultCandidate
								key={candidate.id}
								candidate={candidate}
								position={index + 1}
							/>
						))}
					</React.Fragment>
				))}
			</View>
		</ScrollView>
	);
};

// Component for Candidates tab content
const CandidatesRoute = ({positionsData}: { positionsData: PositionsCandidatesResult }) => {
	return (
		<ScrollView
			bounces={false}
			contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
			showsVerticalScrollIndicator={false}
		>
			<View className='gap-6'>
				{positionsData && Object.entries(positionsData).map(([positionName, position]) => (
					<React.Fragment key={positionName}>
						<ThemedText
							type='subtitle'
							className='text-primary-light dark:text-primary-dark'
						>
							{positionName}
						</ThemedText>
						{position.candidates.map((candidate) => (
							<CandidateCard key={candidate.id} candidate={candidate}/>
						))}
					</React.Fragment>
				))}
			</View>
		</ScrollView>
	);
};

const ViewArea = ({positionsData}: { positionsData: PositionsCandidatesResult | undefined }) => {
	if (positionsData == undefined) return <></>;
	
	const {id} = useLocalSearchParams<{ id: string }>();
	const {data} = getElection(id);
	
	const {colors} = useTheme();
	const layout = useWindowDimensions();
	
	// Get theme colors
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
	
	// Create scene map with positionsData
	const renderScene = useMemo(() =>
		SceneMap({
			liveResult: () => <LiveResultRoute positionsData={positionsData}/>,
			candidates: () => <CandidatesRoute positionsData={positionsData}/>,
		}), [positionsData]
	);
	
	// Custom tab bar
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{height: 3, backgroundColor: primaryColor}}
			style={{
				backgroundColor,
				width: data?.election?.dateBasedStatus === 'upcoming' ? '50%' : '80%',
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
		/>
	);
};

export default Index;