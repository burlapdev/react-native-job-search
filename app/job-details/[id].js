import React, {useCallback, useState} from 'react'
import { 
    Text, View,
    SafeAreaView,
    ActivityIndicator, 
    RefreshControl, 
    ScrollView } from 'react-native'
import { Stack, useRouter, useSearchParams, useLocalSearchParams } from 'expo-router'
import { Company,
        JobAbout,
        JobFooter,
        JobTabs,
        ScreenHeaderBtn,
        Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hooks/useFetch'
import { set } from 'react-native-reanimated'

const tabs = ['About', 'Qualifications', 'Responsibilities'];

function JobDetails() {
    const router = useRouter();
    const params = useSearchParams();
    const localParams = useLocalSearchParams();

    const { data, isLoading, error, refetch } = useFetch('job-details', {job_id: params.id })

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    const displayTabContent = () => {
        switch(activeTab) {
            case 'Qualifications':
                return <Specifics
                    title='Qualifications'
                    points={data[Number(localParams.index)].job_highlights?.Qualifications ?? ['N/A']} 
                />
            case 'Responsibilities':
                return <Specifics
                    title='Responsibilities'
                    points={data[Number(localParams.index)].job_highlights?.Responsibilities ?? ['N/A']} 
                />
            case 'About':
                return <JobAbout info={data[Number(localParams.index)].job_description ?? 'No data provided'} />
            default:
                return;
        }
    }
    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension={'60%'}
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension={'60%'}
                            
                        />
                    ),
                    headerTitle: ''
                }} />
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        {
                            isLoading ? (
                                <ActivityIndicator size={'large'} color={COLORS.primary} />
                            ) : error ? (
                                <Text>Error: Something went wrong</Text>
                            ) : data.length === 0 ? (
                                <Text>No Data Found</Text>
                            ) : (
                                <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                                    <Company 
                                        companyName={data[Number(localParams.index)].employer_name}
                                        companyLogo={data[Number(localParams.index)].employer_logo}
                                        jobTitle={data[Number(localParams.index)].job_title}
                                        location={data[Number(localParams.index)].job_country}
                                    />
                                    <JobTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab} 
                                    />
                                    {displayTabContent()}
                                </View>
                            )
                         }

                    </ScrollView>
                    <JobFooter url={data[Number(localParams.index)]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
                </>
            
        </SafeAreaView>
  )
}

export default JobDetails