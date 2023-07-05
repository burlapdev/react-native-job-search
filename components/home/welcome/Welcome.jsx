import {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import {icons, SIZES} from '../../../constants';

import styles from './welcome.style'

const jobTypes = ['Full-Time', 'Part-Time', 'Contractor', 'Freelance'];

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Natives</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search"
            value={searchTerm} 
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.searchInput}></TextInput>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image 
            source={icons.search} 
            style={styles.searchBtnImage} 
            resizeMode='contain' />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item}`}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({item}) => ( 
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)} 
              onPress={()=>{ 
                setActiveJobType(item)
                router.push(`/search/${item}`)
                }}>
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
    </View>
  )
}

export default Welcome