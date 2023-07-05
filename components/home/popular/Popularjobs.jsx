import { useState} from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard  from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const { error, loading, data, reFetch } = useFetch('search', {
    query: 'React Developer',
    page: 1,
    num_pages: 1
 
  });
  const [selectJob, setSelectJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectJob(item.job_id);
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{`Here's what went wrong ${error}`}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => `${item?.job_id}` }
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => (
              <PopularJobCard item={item} onPress={handleCardPress} />
            )}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs