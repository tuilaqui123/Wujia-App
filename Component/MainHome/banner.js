import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
    const BannerImage = [
        require('../../assets/images/BANNER/banner1.jpg'),
        require('../../assets/images/BANNER/banner2.jpg'),
        require('../../assets/images/BANNER/banner3.jpg'),
    ]
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.bannerImg}
                source={require('../../assets/images/BANNER/banner1.jpg')}
            />
            {/* <Image
                style={styles.bannerImg}
                source={require('../../assets/images/BANNER/banner2.jpg')}
            />
            <Image
                style={styles.bannerImg}
                source={require('../../assets/images/BANNER/banner3.jpg')}
            /> */}

            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                style={{ width: '100%' }}
            >
                <SwiperSlide>
                    <Image
                        style={styles.bannerImg}
                        source={require('../../assets/images/BANNER/banner1.jpg')}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        style={styles.bannerImg}
                        source={require('../../assets/images/BANNER/banner3.jpg')}
                    />
                </SwiperSlide>
            </Swiper>

        </View>
    )
}

const styles = StyleSheet.create({
    bannerImg: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'lightgrey',
    }
});

export default Banner;