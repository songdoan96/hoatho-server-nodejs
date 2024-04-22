import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import Button from '../../../components/Button';
import CustomAxios from '../../../utils/CustomAxios';
import {storage} from '../../../utils/storage';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
const AddNewScreen = () => {
  const richText = React.useRef();
  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const handleInsertImage = () => {
    richText.current?.insertImage('https://placehold.co/600x400', 'alt text');
  };
  const handleAddNew = () => {
    setLoading(true);
    try {
      CustomAxios.post(
        'news/create',
        {title, content},
        {
          headers: {
            Authorization: `Bearer ${storage.getString('@ht:token')}`,
          },
        },
      );
    } catch (error) {}
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.insertImage,
        ]}
        iconMap={{
          [actions.heading1]: handleHead,
        }}
        onPressAddImage={() => handleInsertImage()}
      />

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text style={styles.title}>Tiêu đề:</Text>
          <TextInput
            style={{backgroundColor: '#fff', paddingHorizontal: 10}}
            onChangeText={text => setTitle(text)}
          />
          <Text style={styles.title}>Nội dung:</Text>
          <RichEditor
            style={{flex: 1, height: '100%'}}
            initialHeight={500}
            ref={richText}
            onChange={descriptionText => setContent(descriptionText)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Button style={styles.btnAdd} onPress={handleAddNew} loading={loading}>
        Thêm
      </Button>
    </SafeAreaView>
  );
};

export default AddNewScreen;
const styles = StyleSheet.create({
  title: {
    paddingVertical: 4,
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
