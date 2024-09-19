import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useCaches} from '@src/stores';
import React from 'react';
import {Image} from 'react-native';
import Courses from '../Courses';
import Home from '../Home';
import My from '../My';
import Words from '../Words';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const screens = [
    {
      name: 'Home',
      component: Home,
      icon: require('./assets/menu_home.png'),
      label: '首页',
    },
    {
      name: 'Courses',
      component: Courses,
      icon: require('./assets/menu_course.png'),
      label: '课程',
    },
    {
      name: 'Words',
      component: Words,
      icon: require('./assets/menu_translate.png'),
      label: '单词',
    },
    {
      name: 'Exam',
      component: Home,
      icon: require('./assets/menu_exam.png'),
      label: '考试',
    },
    {
      name: 'Me',
      component: My,
      icon: require('./assets/menu_me.png'),
      label: '我的',
    },
  ];
  const {theme} = useCaches();
  return (
    <Tab.Navigator>
      {screens.map((it, i) => (
        <Tab.Screen
          {...it}
          key={i}
          options={{
            headerShown: false,
            tabBarLabel: it.label,
            tabBarActiveTintColor: theme,
            tabBarIcon: ({color}) => (
              <Image
                source={it.icon}
                style={{height: 24, width: 24, tintColor: color}}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MainScreen;
