import React, { useState, useEffect } from 'react';
import EthLogo from './ethereum-icon-20.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Popover from 'react-native-popover-view';
import {
    LineChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


const CoinItem = ({ marketCoin }) => {
    const { id, name, current_price, market_cap_rank, price_change_percentage_24h, symbol, market_cap, image, sparkline_in_7d, price_change_percentage_7d_in_currency } = marketCoin;

    console.log(sparkline_in_7d)
    const formatMarketCap = (mCap) => {
        if (mCap > 1e12) {
            return `${(mCap / 1e12).toFixed(3)} T`;
        }
        if (mCap > 1e9) {
            return `${(mCap / 1e9).toFixed(3)} B`;
        }
        if (mCap > 1e6) {
            return `${(mCap / 1e6).toFixed(3)} M`;
        }
        if (mCap > 1e3) {
            return `${(mCap / 1e3).toFixed(3)} K`;
        }
        return mCap;
    }

    // const transformData = (data) => {
    //     let x = [];
    //     data.map(each => {
    //         x.push(each.x)
    //     })
    //     plot_data['x'] = x;
    //     plot_data['y'] = y;
    //     console.log(x)
    //     return x;
    // }


    return (
        <View style={styles.coinContainer}>
            <Popover popoverStyle={{ width: 450, height: 320, borderRadius: 30 }}
                from={(
                    <TouchableOpacity
                        key={id}
                        style={styles.coinContainer}
                    >
                        <Image source={{ uri: image }} style={{ height: 55, width: 55, marginLeft: 10, alignSelf: 'center' }}></Image>
                        <View>
                            <Text style={styles.coin}>{name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.number}>{market_cap_rank}</Text>
                                <Text style={styles.coin}>{symbol.toUpperCase()}</Text>
                                <FontAwesomeIcon icon={price_change_percentage_24h < 0 ? faArrowDown : faArrowUp} size={15} color={price_change_percentage_24h < 0 ? 'red' : 'green'} style={{ alignSelf: 'center', marginRight: 5 }} />
                                <Text style={styles.coin} >{price_change_percentage_24h.toFixed(2)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 'auto' }}>
                            <Text style={styles.coin}>{current_price}$</Text>
                            <Text style={styles.coin}>M. Cap:{formatMarketCap(market_cap)}</Text>
                        </View>
                    </TouchableOpacity>
                )} >
                <View style={{ paddingHorizontal: 10 }} >
                    <View>
                        <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>{name}</Text>
                        <LineChart
                            data={{
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                datasets: [
                                    {
                                       // data: transformData(sparkline_in_7d.price)

                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                    }
                                ]
                            }}
                            width={370}
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </View>
            </Popover>
        </View>
    );
}


const styles = StyleSheet.create({
    coin: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10
    },
    coinContainer: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#bcbcbc',
        padding: 15
    },
    number: {
        fontWeight: 'bold',
        marginLeft: 5
    }
})


export default CoinItem;