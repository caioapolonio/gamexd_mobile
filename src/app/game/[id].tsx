import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useLocalSearchParams, router, useNavigation } from 'expo-router';
import { View, Text, Image, ScrollView, ActivityIndicator, VirtualizedList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const GameDetails = () => {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams(); // Pegando o id da URL
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([])
    const [totalRating, setTotalRating] = useState(0)
    const [averageRating, setAverageRating] = useState(null)
    const [platforms, setPlatforms] = useState([])

    const fetchGameDetails = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/games/${id}`); // Endpoint para detalhes do jogo
            const result = await response.json();
            setGameDetails(result);
            const activePlatforms = Object.entries(result.platforms)
                .filter(([key, value]) => value)
                .map(([key]) => key)

            setPlatforms(activePlatforms)
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar os detalhes do jogo:", error);
        }
    };

    async function fetchReviews() {
        try {
            const response = await fetch(`http://10.0.2.2:3000/reviews/${id}`)

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const result = await response.json()
            console.log('All Reviews', result)
            setReviews(result)
            if (result.length > 0) {
                const totalRatingResult = result.reduce((sum, review) => sum + review.star_rating, 0)
                setTotalRating(totalRatingResult)
                setAverageRating(totalRatingResult / result.length)
            } else {
                setAverageRating('Sem avaliações')
            }
            console.log('Average Rating:', averageRating)
        } catch (error) {
            console.error('Erro ao recuperar dados:', error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: gameDetails?.name,
            headerTintColor: '#FFFFFF',
            headerStyle: {
                backgroundColor: '#171524',
            },
        });
    }, [navigation, gameDetails]);

    useEffect(() => {
        fetchGameDetails();
        fetchReviews();

    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    return (
        <ScrollView className='bg-[#171524] h-full w-full'>
            <View>
                <Image source={{ uri: gameDetails?.header_image }} className='h-72 rounded' />

                <View className='flex flex-row justify-between p-4'>
                    <View className='w-[70%]'>
                        <Text className='text-white'>{gameDetails?.short_description}</Text>
                    </View>

                    <View className='flex flex-col bg-[#373545] w-[30%] rounded-lg'>
                        <View className='flex flex-row gap-5 justify-center mt-4'>
                            <View className='flex flex-row gap-1'>
                                <FontAwesome name="star-o" size={24} color="green" />
                                <Text className='text-white'>{totalRating}</Text>
                            </View>
                            <View className='flex flex-row gap-1'>
                                <FontAwesome name="pencil" size={16} color="pink" />
                                <Text className='text-white'>{reviews.length}</Text>
                            </View>

                        </View>
                        <View className='p-2'>
                            <Text className="text-white">Média</Text>
                            <View className="h-0.5 w-full bg-white"></View>
                            <Text className='text-white'>{averageRating}</Text>
                        </View>
                        <View className='p-2'>
                            <Text className="text-white">Plataformas</Text>
                            <View className="h-0.5 w-full bg-white"></View>

                            <View className='pt-2 g-'>
                                {platforms?.map((item) =>
                                    <View className='rounded-full text-sm border border-neutral-50 text-neutral-50 inline-flex items-center'>
                                        <Text className='text-white' key={item}>{item}</Text>
                                    </View>
                                )}
                            </View>
                        </View>



                    </View>

                </View>
                <View className='flex flex-col p-4'>
                    <Text className="text-white text-lg">Avaliações</Text>
                    <View className="h-0.5 w-full bg-white"></View>
                    <ScrollView className="h-64 w-full pt-4">
                        <View className="flex flex-col px-4 gap-10">
                            {reviews.map((item) => (
                                <View key={item.id} className="flex flex-row justify-between">
                                    <View className="flex flex-row gap-6">
                                        <Image
                                            className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                                            source={{ uri: item.profiles.avatar_url }}
                                        />
                                        <View>
                                            <Text className="text-white text-lg">{item.profiles.username}</Text>
                                            <Text
                                                className="text-white text-base w-36"
                                                numberOfLines={5}
                                            >
                                                {item.review_body}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

export default GameDetails;
