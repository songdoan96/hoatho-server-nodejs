import {Link} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {ActivityIndicator, Avatar, Card, Text} from 'react-native-paper';
import http from '../../utils/http';
import storage from '../../utils/storage';
// import RenderHtml from 'react-native-render-html';

const NotificationScreen = () => {
  const {isPending, error, data, isSuccess, refetch, isFetching} = useQuery({
    queryKey: ['getAllNews'],
    queryFn: async () =>
      await http.get('/news/all', {
        headers: {
          Authorization: `Bearer ${storage.getString('@ht:token')}`,
        },
      }),
  });
  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isPending || isFetching) {
    return (
      <ActivityIndicator size={'large'} animating={true} style={{flex: 1}} />
    );
  }
  return (
    <View style={{padding: 10}}>
      <FlatList
        data={data?.data.data}
        renderItem={item => (
          <Card mode="outlined" style={{marginBottom: 10, overflow: 'hidden'}}>
            <Link to={{screen: 'NewsScreen', params: {id: item.item._id}}}>
              <Card.Title
                title={item.item.title}
                subtitle={moment(item.item.createdAt).format('DD-MM-YYYY')}
                left={props => <Avatar.Icon {...props} icon="newspaper" />}
              />
            </Link>
          </Card>
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NotificationScreen;
