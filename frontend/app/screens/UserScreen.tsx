import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ImageBackground, TouchableOpacity,
} from 'react-native';
import BottomNavigator from '@/components/BottomNavigator';
import {styles} from '@/styles/styles';
import TopNavigator from '@/components/TopNavigator';
import {useNavigation} from '@react-navigation/native';
import RecipeItem from '@/components/RecipeItem';
import {useRoute} from '@react-navigation/native';
import memberApi from '@/apis/memberApi';
import recipeApi from '@/apis/recipeApi';
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {SvgXml} from "react-native-svg";
import {filledfollowIcon, followIcon} from "@/assets/icons/icons";
import {TEXT_SUB_COLOR} from "@/assets/colors/colors";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
  route?: any;
}

const UserScreen = ({title = '김석주', optionTitle, optionFunction}: props) => {
  const [id, setId] = useState(0);
  const [nickname, setNickname] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [follower, setFollower] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(5);
  const [like, setLike] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const memberId = useSelector((state: RootState) => state.userReducer.memberId);


  // 이 페이지로 넘겨준 데이터 형식
  /*
  const data = {
    id: parseInt(memberId.text),
  };
  */



  useEffect(() => {
    async function setMemberId() {
      await setId(route.params.id);
      const memberInfoRequest = await memberApi.otherDetail(route.params);
      const response = memberInfoRequest.data;
      setFollower(response.data.memberInfo.followCount);
      setNickname(response.data.memberInfo.nickname);
      setProfileUrl(response.data.memberInfo.profileImageUrl);

      const followRes = await memberApi.toggleFollow( memberId, route.params.id);
      setLike(!followRes.data.data.flag);
      await memberApi.toggleFollow( memberId, route.params.id);
    }
    setMemberId();
  }, []);

  async function getRecipes(newPage: number) {
    const recipeRequest = await recipeApi.getOthersRecipe(id, memberId, newPage, size);
    return recipeRequest;
  }

  useEffect(() => {
    async function func(){
      const request = await getRecipes(page);
      const response = request.data;
      setTotalPage(response.data.totalPage);
      setRecipes(response.data.recipe);
    }
    func();
  }, [id]);

  useEffect(()=>{
  }, [page]);

  const pageIsValid = (request: any, targetPage: number) => {
    if(totalPage > targetPage && targetPage >= 0) return true;
    return false;
  }

  const changePage = async (newPage: number) => {
    const result = await getRecipes(newPage);
    if(result.status === 200 && pageIsValid(result, newPage)){
      setPage(newPage);
      setRecipes(result.data.data.recipe);
    }
  }

  const beforePage = async () => {
    await changePage(page - 1);
  };

  const nextPage = async () => {
    await changePage(page + 1);
  }

  const pressAfter = async () => {
    setIsDisabled(pre => true);
    const followRes = await memberApi.toggleFollow( memberId, id );
    setLike(followRes.data.data.flag);
    setIsDisabled(pre => false);

    const memberInfoRequest = await memberApi.otherDetail(route.params);
    const response = memberInfoRequest.data;
    setFollower(response.data.memberInfo.followCount);
  };

  return (
    <View style={styles.layout}>
      {/*<MyHouseModal/>*/}
      <TopNavigator
        title={nickname}
        optionTitle={optionTitle}
        optionFunction={optionFunction}
      />
      <View style={[{width: '100%', flex: 1}]}>
        <ScrollView style={{}}>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              height: 150,
              flexDirection: 'row',
              padding: 10,
            }}>
            <View style={{flex: 1, borderWidth: 1}}>
              <ImageBackground
                source={{uri: profileUrl}}
                resizeMode={'cover'}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={{flex: 1, borderWidth: 1}}>
              <View style={{flex: 1, marginLeft: 5, marginTop: 5}}>
                <Text style={styles.font}>팔로워 수</Text>
                <View style={{ flexDirection:'row', justifyContent:'center', marginVertical:3}}>
                  <TouchableOpacity onPress={pressAfter} disabled={isDisabled}>
                    {like ? <SvgXml
                      xml={filledfollowIcon}
                      width={20}
                      height={20}
                    />:<SvgXml
                      xml={followIcon}
                      width={20}
                      height={20}
                    />}
                  </TouchableOpacity>
                  <Text style={[styles.font,{fontSize:20, color:TEXT_SUB_COLOR}]}>{follower}</Text>
                </View>
              </View>
              <View style={{flex: 1, marginLeft: 5, marginTop: 5}}>
                <Text style={styles.font}>나눔</Text>
              </View>
            </View>
          </View>
          {recipes.map(item => {
            return (
              <React.Fragment key={`recipe${item.recipeId}`}>
                <RecipeItem
                  item={item}
                  navigation={navigation}
                  width="90%"
                  height={180}
                />
              </React.Fragment>
            );
          })}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
            <Button
              title="이전"
              onPress={beforePage}
            />
            <Text style={styles.font}>
              페이지 : {page + 1}/{totalPage}
            </Text>
            <Button
              title="다음"
              onPress={nextPage}
            />
          </View>
        </ScrollView>
        {/*<RecipeList horizontal={false} recipeList={recipe} navigation={navigation}/>*/}
      </View>
      <View style={{height: 80}} />
      <BottomNavigator now="" />
    </View>
  );
};

export default UserScreen;
