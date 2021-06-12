import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
} from 'react-native-draggable-flatlist';

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

export default function Focus() {
    const [data, setData] = useState(exampleData);

    const renderItem = useCallback(
        ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
            return (
                <TouchableOpacity
                    style={{
                        height: 100,
                        backgroundColor: isActive
                            ? 'red'
                            : item.backgroundColor,
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
                        Item
                    </Text>
                </TouchableOpacity>
            );
        },
        []
    );

    return (
        <View>
            <DraggableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    item.key;
                }}
                onDragEnd={({ data }) => setData(data)}
            />
        </View>
    );
}
