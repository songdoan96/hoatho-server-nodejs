import {ScrollView, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {Text, Title} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import http from '../../utils/http';
import storage from '../../utils/storage';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';
const NewsScreen = () => {
  const route = useRoute();
  const id = route.params.id;
  const {data, isPending} = useQuery({
    queryKey: ['getNews'],
    queryFn: async () => {
      return await http.get('/news/get/' + id, {
        headers: {
          Authorization: 'Bearer ' + storage.getString('@ht:token'),
        },
      });
    },
  });
  const {width} = useWindowDimensions();

  if (isPending) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={{padding: 10, overflow: 'hidden'}}>
      <Title>{data?.data.data.title}</Title>
      <Text variant="labelMedium" style={{marginVertical: 6}}>
        {moment(data?.data.data.createdAt).format('DD-MM-YYYY')}
      </Text>
      <ScrollView>
        <RenderHTML
          contentWidth={width}
          source={{html: data?.data.data.content}}
        />
      </ScrollView>
    </View>
  );
};

export default NewsScreen;
