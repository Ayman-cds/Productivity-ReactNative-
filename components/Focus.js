// import React, { useState, useCallback } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import DraggableFlatList, {
//     RenderItemParams,
// } from 'react-native-draggable-flatlist';

import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const exampleData = [
    {
        key: 0,
        name: 'first thing',
    },
    {
        key: 1,
        name: 'second thing',
    },
    {
        key: 2,
        name: 'thrid thing',
    },
    {
        key: 3,
        name: 'fourth thing',
    },
];
// const exampleData = [...Array(20)].map((d, index) => ({
//   key: `item-${index}`, // For example only -- don't use index as your key!
//   label: index,
//   backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
//   5}, ${132})`
// }));

export default function Focus() {
    const [data, setData] = useState(exampleData);
    const renderItem = ({ item, index, drag, isActive }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    backgroundColor: isActive ? 'blue' : item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onLongPress={drag}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 32,
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <DraggableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({ d }) => setData({ d })}
            />
        </View>
    );
}
