import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Button,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import LogoutButton from '../components/buttons/LogoutButton';
import { GET_USERS_POSTS } from '../lib/queries';
import { Media, MediaType, ProfilePost } from '../lib/types';
import { useUser } from '../lib/user';
import * as VideoThumbnails from 'expo-video-thumbnails';

const PLACEHOLDER_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/1200px-Soccerball.svg.png';

const ProfileScreen: React.FC = (): JSX.Element => {
    const [posts, setPosts] = useState<ProfilePost[]>([]);

    const user = useUser();

    const { loading, error, data } = useQuery(GET_USERS_POSTS, { variables: { user_id: user.id } });

    useEffect(() => {
        async function getThumbnailUri(url: string): Promise<string> {
            let thumbnailUri: string = PLACEHOLDER_IMAGE;
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(url ?? '', {
                    time: 15000,
                });

                if (uri !== undefined) {
                    thumbnailUri = uri;
                }
            } catch (e) {
                console.log(e);
            }
            return thumbnailUri;
        }
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: ProfilePost[] = [];
                for (const post of data.posts) {
                    let thumnbailUrl: string;
                    const url = (await Storage.get(post.post_content.s3_key)) as string;
                    if (post.post_content.type === MediaType.VIDEO) {
                        thumnbailUrl = await getThumbnailUri(url);
                    } else {
                        thumnbailUrl = url;
                    }
                    fetchedPosts.push({
                        id: post.id,
                        url: thumnbailUrl,
                    });
                }
                setPosts(fetchedPosts);
            }
        }
        fetchPosts();
    }, [data]);

    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.profHeader}>
                    <Grid>
                        <Row>
                            <Col>
                                <Image
                                    style={styles.profPic}
                                    source={{
                                        uri:
                                            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUVFxUYFxUVFRUVFRcXFRUWFhUVFhUYHSggGBolHRUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQFy0dHR0tLS0tKy0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0rLTcrLTc3LS03LTctNy0rLSstN//AABEIAOMA3gMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYHAQj/xABBEAABAwIEAgcGBQMCBAcAAAABAAIRAwQFEiExQVEGImFxgZHwEzKhscHRBxRCUvEVI3Ji4QiCkrIWJDRDU3OD/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAJBEAAgICAgMAAQUAAAAAAAAAAAECEQMhEjEEE0FxFCIyUWH/2gAMAwEAAhEDEQA/AOIL1JIIBEvUl6uCIK16PYYa9ZrOG57lVhbr8JcpvWtdx+mqEno47n0K6K07ek0lgzEctlrA2NgvKWwjknIxVIDBMRw6lXY6nWY17XCCCAV8x/id0R/p90WNk0qgz0ieUwWk8wfmF9Trkv4+hhpW4I64c9wPJoEE9upGiDX0FnE7G2mk8zDjlaBzzOaSI56FeWTA4hzvdpy46biRp4mPNescKbDlOZxjLGmWdyRzITRbPqDKxsADrH3W6nSSdN+P2RHBH1cxJAjjHfspbWq8mAfeIjYS7hr4lTtwwgSSAObXNd1v8QZheCnlkuB3gEtLWnzC4A8MLgXEiZPbJO5kbHY6qGm4kAO/T8Bz7lK5ubVsNPIADxaY7NkntcW5iJA/VGniUOwktANfLH6NnQ6dV0Qddo2KrL20dTeWuHIg8CDqCOwp8lplv8/cKetVFRg5jbu5dyNgaK5JJJccJSUVGpKS4DCwvU1qcuFIKqdSokqRrJK0eEYcNFPJPiisI2U1HCXHgiP6G7kt7ZYcOSsRh45LHLyWmaFhRw5eheKWjRLiGtEk7AL0DKlYwJLbYV+H1R7Q6o8MnhElF3X4auiadWTyc2Pis/6rEnVl142Rq6Ofq06PYmbevTqt/S4Hw4hD4lhtSg8sqNIIQgKtaktEWmtM+uuiuP07ii1zXAgiQfmD2hX6+SOi/SuvZumm6Wk6sOrT9vBdJsPxiOUBzCD35gutoWjseKXbaVJ9So7IxjS5ztNA0Sd18tdMellS9rOrOn9rWkQWtmWgwYMd27jzV105/EKreU/Y6tYTL+0AyxscuPgFgGunT13o3Z1CYRMkwfj/ALKU3jj2DxP8leupDK2N+Pj7unrcpopa7ffiuGHU71o/SXHtdHh1RPxUzsXJGVzGuHAOLjHLWfmoG2U/H4T9l6+yMSNdY/ldYKGmsJ0bA00BP1R1vc/pzEHgQdT2OGxQJoGPkmvYYkDbiuCEVLU6kd+m3f2BeWzNYOhClt3OiUXTpCA50ieyfd0MDjMkeS44rr2zLetBg/MaH6IJaHEKksyCcu8H3o5lVf5Ikdo4cTOug4ogAU+kmkJ1NcAJBTg5RAr0lcKG2YlwWxwkLFWlTVajDbpZc6s042bixVmxqzdhfBWrcRaBuF5souzUmcHC6F+GmDh2as4TBhv1K56up/hZfNNJ9L9QMgdi9Ly21j0Z/FSc9m2OifSeoqoXlMLxGeuU3T/CGVbc1IGZnHsOi4q9sEjku5dMboMtXA7ugBcOrOlxPaV63gN8dnmeYkpaPWFTMch2KUO9fNbzGiS6eXH7aJ1tblxgb80mlX2G2w94jdTnKkVxw5MCoYcXDsG3n8VaUMCmCIR1NkkK4sqBPcs0szNcMESrodHuyP8AaPqnVejDv0/HTjuPILW0KUI0UpGyT3SKvx4nO6uBVNeqJkkTqT4Dx80JUwOpoDSdyPbpv8viuossR+36IkWg5Kizsi/GRzCjgFXT+3l7zwJkg+uCLqWgptgNL3x70aA9kbLoNa0byUf5Fsbfdd72d+mRya7tCPfBncxpv28lXmm6ZZMyfLSDK63e4Y0g9UR2rI4ngmQ5mjq8eeg4cwrQzJkMmBx2YbEGcS2HD3uZnUOQrQr66oyTOvDXt0HyKpQyDB4K5nZ60JOCkASc1AWyKk6Cra1uYVO5TU6iSSspFmmo38Kb+pdqztOqnl6h60V5FIrHA8Ufb1A9hghAZUoWiSUlTIptOzseFdMqNVoznI7jyRtx0kt2Cc+bsA+q4ix5GxhPfcuO7j5rC/BjembF5kqNN0v6TGuYGjeQ2CyaRK8W3HjUFSMuSbm7ZJSCkDEygiWjRFipElBvwjzWhstAFTUKcDtPwV7Qb1RG6z5WasK2WVq2dVfYaOCp7UbK2sis0tm6BpbC2DhJhFspcFX2V5ARbbqd9EqoLsNa0KSlTBKDZX5bJ7bjX15p0xGmEvs8x01TKlpAnULxl9BRFe6zDXdOlFoX9yKq4pqmv6QymR62V/VMquuxwCVaYzdqjmOKNyk9x+e/rks5dUsru9azGKXXeI9an7rP1rfMdOE+XYvQi9HlZFtgICRCmfRIUZCYkB1N140p9Ruq8DErHRPTcnZ0xrUiEtDWDhq8IUuVMcmARlNITilC4FDCF4nwmkInElJF0yhKSJpHUd4SSGj2WVpbk68NPh/Cu7fSEDS00Ta1yZhmpPw71ldyZtjUTSCq0DU/FH2Ds3dssjQwqq8yXT4/wjRhldo6rj3bgoetPVj+xr4b63pSrKlazELlLMTrUolxB9b+S1/RzpTMNeQe0/L6LngaGWe9GzpWJid0nWpB2R9riBLZhQtunZwTGmveEHFIPKQOMOdvBTHW0Iu/6TUqQOkxMiYG3E9yx9104c9xLKbAzhmOveeHA81RYbWifva7LmtXy6HRQV3Bw0VFVx2pcQxlMA7BwJOYHYZdues8EI6rdUD12y3iATpppBQ9TQfagfHKMOJd+rY9on7/ABVJh1HNWLTyMeYWxuqbK9LMNiJHksv0eE3LZ/a746j12q0ZftMuaNO/7I8Rw3SYWdr0YK6Pf2+hWKxalBTQlaM7jTKU004UlISntEoNjpAztEwuRD2KB4RTAxGmoHsVs+ihX00bH4AGRelqKNNRvausVxBnBeMplxhoJJ4BPqI/AqGYvO0ACRoesf8AZFulZ0Y8pUBPtXs95pHbwXtMa+XzWqoUXZTMuDdSTqQBvPMKnxS0FNwLdnaj7KSyXovPDw2FsdopsOpdeYUFu2Vc2dtBBUW6LRjZZmqym0ZpBOyVDpDSpwHAn7AT3cOabfYS+qOq6I9QvKOBlwax9KABGmm++vHmjHiUlz6RaV/y1eWmnkcA1xcWODQ2oA6m7O0lpBncaKlv8P8Ay5a4bOMjYg8ZBGh9aLcYNhzLam4U3FuYNDtQZDeBkdp0HNUOLWTAwgEnWcvAHmOR+yacl8EjBvsv8AxVuQa8PQK0DKrCwfu5rmuCvyvAndbumeqO1Z03ZZxXEpMZsmGczsoM9+upVJZssA8+0c4ka8IjcnKNY4mVq8Ss/aMAMbncTx27lS4p0SFdrWOhoa0tGUBpIGoB5nUjxWiLITjrRe2L7UA+xeJ1BEQQRMgg7GfkpasFhB137u+fBZup0Zc0Pcx7jWc5p9qZzQ1oaGlo0I0+SuMIoVGNirE/6ZjYcxojPT7DDapopqND2YqNgQCSI5ET91mOjAArPcTENMSd8x5eC2+I0iGv7Wn5FVfRrCooZz7zwXSRqJktA7hr4oKWmCWLnJI8u6wLViMcqLSYzdFpg75WzGmpaJMLGYhVzFPjiYsq4yoBc9S06q8p2hKsLfCieCMmgIr6lRDuetK3A54KT/w+OSXmkGgSq3RV1ZHVnoC4T0Usic5QVHLx7lC9yKQjYyoVcdGHjM9p5Nd/0u63wKpHFE4ZVyVGu4bHuOh+fwRkridjlU0zbublYBEkifA81TYlRORpPBw8iFc5/dPCACe0KHG2TRLhBhw28wscdM9HIrRV2m6vrN6zlJ2vkrqyJEIzQmNmtsamgCtLUkqgsqx0C0tlRnXs24qKNPwlfSn1PkPBU2PuDGxxO33WibTgGNO2Vhcfuw6oYM8u7n4ovYvwiwpw9oCfD14rcseYasbg9t1mudx2H1Wzq0eqNYR+hXQYWBze1Oo1CNCZ79UDZVQHQ6RyP3V8bDSWkEJ1ZOVLsG9qCPt9kNcnTRFi27PohL1sT3I99g/BWXmsePyRFvZFlpTfrla0SOUtgKtruhx14FG/1LIx1PWBTEjhsCO9cqDtO18OcdK6v99zR+lrGmObWNDvj9UDY4fmOoRVaiXVCTuSSfEyreyogKzlS0ebLcmyawwlumgV5b4O3kFFaBXFF8BZJSbY6RFSwpnJTDCm8kQyoEZRISWE4M4KCuxFFRVF6CYjKes1DOKOum6oOo1URNjWNRDWqOmpwuZyNNgl4HZddQdROnfHBH4nT6j45agcDuDHl5rLYVd+yqsqQSGuaS0GMwB6zZ4SJ14LRYn0lp131X5Mhqkw0bNGzRPGAB5LNLG7tGyGW1TKNXVpV0Cp26lGUwRqlmPjNXhdSY9etlq8NqaALC4XcagegtnhbxEnftWd9mtPQfihcaT2t3cIHDv+y53eUHUy41WOHIgE+AhbDEsRh0BDE+0Cdf6K9lD0ex9rKjRWaQ3gXNgePBdCoYnTqBwiTwy6+gqPD8NBOonyPFXeGW7aboDA2d8rYHeqJJsR2lsi9o3MGFjgTqDlkeJ4HvhWzrg02h06iAe3WB9kNVpET9UObog5XNkdoTVXQt32aG3umPEga8QqzFIIPrwUVN4B02OhQl9daGfsklLVMMY/UVF0yXNHMgeaucZpt9i3KNak6xoQDEjskaQqe3ANann93NJ7oVxjOJF7WMmQyYMQY4A+ELotJbEyN3oxlW162yjzBqsK79VWXtLjMLo7MskWdrcqa7xIMA1WYc5w2Kz3SPEKgAE8UVitiN0jeDHhO6urLGARuuFHEKn7itFg+KPjVxTT8ekCM7B86Y8qCnVXudUCRXDZQcI6og6m6ohGiEGFI16iqpgcnqxQrOn0WlxQeZW1izQJWqC2F241VixmnkgKHvHvVrbN2WWfZux7Q63OWrHd5LYNrHII4/P0Vj7wQ8O7vgtx0dyvbqJMbKTWzRF0imvqmVwB1JnyRtlcPc0OZTLgTlkCQSP0zz7EZ0kwtlRgczqubuJ0dsYPrip+jeNsoUW0XMIitPVGYAHrB095g+irRimLKUo9IZYV7kzltnnJo4ZSIO2uuitbO6rFub8o+BuZMStXh+M2+ao4uDdWl2bTdrYPcRCl/rdqKZHtWGP0tIc7f9o1KsoRIPyJ9cTNV6lyCZt9QJMO2A1J371TDpBTfUNN/VqN3a7R3LVpgwtzddJKADsvWIaOEA9mqyH9FZc3P5yuzUZQ3uYSRp4mecoTUR4OT7jRMHmBHP67oO7kk/5RPht65K8e1ol2gjVUZAJ7tT2k/wAFZ5IrFgNy/K/Ny/hD3F8DxQnS+79nSniXNA+f0WPOKE8Vyx2Zss6dGlfd9bdDXl3KzbcQ626JdXnVXWOjO5WGVLhZ7pEcwBRlV6q8Yq6BqaMdiyeioCtbN2UKqajaT1SexEJtRTe0Ve16mY9BxGTDC5D1EmvXjyggsieoCFMSo4VEINCtrOpoFVhqnoPhBnUXDXQ6e75K7tHyFn7V2YFGWV2QYKzTjbNmKVJF1dtzNniNdezdXPRO/g5SdREfT6qmtq4dvsZ7tZ0Q9GqadUEGRP8AHrsUjQnWzoOIVCCeR17p3Vay3h07gjx1U1teB7Wg+P1VlZ2bT2Tw+yRSpl4vQy1tqcfqG+hGmqsra2pcXE9gEJnswzYyirQDkTOqupAk/wCiRls3SBvJ1jhxRbHaZeCcMnioX1wPDVC7IybBMVuABlG5KEbRga7n0V4SXuLztsFBd3Maa7H+PggwROa/iViINVlFp9yXO73aNHlPmscx55qz6VA/mq0/u372hVlMLXFJIwZG3JslBRtC+I0KEAScmokT3GIclV1ahJkqSqoCuSOsSmpOUCKoNXM5EDmr1pU9xT1ULKaA9bJaYUhalTapgEthSBPZpZUQ8JuVGzqIwxL2alhewus6gnChBIR9xaSJG49Qq/Dz1vBX9FvVUMjqRpxK4lXb3Tm6FEmtKVza8QhmthDTDbWjR4XiXDmI7u1aWwvSQNdPj62XPKbiFf4TiYmHHU+Xr7JXjKQyHRLC0zDRw/23mfNWlrbSIn4/XyWUw7EAIgx48OfrkrOliJBkO25QuSoeUm/paXFuWmWn1/Cq7m7OoHHRNuMZkRM6IAvLtvFGkI5N6Jqt7Ayt1Owjipm2v9ok6uO/2XuH2YmSNB6CsagkEHklYyOI9MacXT+0MPm0D6KmYFoOnLYu3f4M+bgqJoWqPSMGT+THBeOK9hMcE5MHqqAqWoo1wKGgI221CFAU1LRc2MkWdWgoDRhWjwhntUFI0OIHELwuSrlDOcnRNuiYuTS9QZ14XJqFsna9PLkMHL0ORoWw2yf1x4rX2dIZRPms50OtBVuCHe7ke0nkXjKD4TK0FmXNJY8Q9hLXA8xofXEFZ8y2a/Gdh39MDtpHPigbvBXjUAEdn2WhstY4o+pQBE69ygpUapY7OeOoEGIT6NHXir24pAVOwrSYTh1J/vNHfHcqeyiPqsyFFhA3PBH21Z2xJ17+C37MBpjZo07Pinswln7QOyNO/sTexHesy9jak7+SvrO0G54cPkjq9s1oEACJ7OC9tmyZQsbiOLAB69ckK93Dt9FGOaZJ9cR67kHcN5euzuSseKOSfiJTIu5gwWNg8DDnTHms3TXR/wAVLMNt7GpGrjcCeYLmuHhoSubt0K2RVRR5s3cmPISLU4pSuOoFqU1GKSKcnMYusFAmRetR5oyh325CAxZPqKFz05zCoXhSoo5A1UodyncVC9URFkSa8pya4JkKxrXKYDRNZThSsTANJ0AIz1Rxhp8JP3XTGYF+cgsgV2t32FQN4OPB3I+HdxXBb80KwqDgdRzadwu5dBMTY+pSqMdLHOAnlmkFpHA67KU42VhNropallUouyVGuY4cCPiOBHaEZTqSNTqukdJMQsA+nb3lSkx9QF1P2hy7ENkVNmmSANRPbqs5inQ59Pr0D7Vm8aZwOzg8eShPA1tG7D5cZalpnPMYYQfqrLAr+CBML3FLQkEEbcCIIPdwKzzHlh7ip1aLNpM6zZVcwRQ5ql6L3XtaUjcIu8rloiUIo5x2K6qawvbZqEYf4+6IaY3n1yCcFE1R6OwXBzVh7xFPgP39/wDp+fduThGBZjnrDq8KfPtf9vPktG4taBJA4CSB3BWx4vrMefyF/GJx7/iCaQLNoENmt5gNEd0ErjlTgeP20Xb/APiCZ/YtHcqtT40j9lw2otiWjBexpK8Ll60wiA1rkvAdTBfaIikVFUs+SZSa5p1QcWFSLWiFI5oQ9CqE51RINZY1reFVXQhW1SsqS/qJUhpMAe7VeSmSvCU1E7PU9gTWsUpTUAjKfTCYU9i44ge3VWeBY3VtX56To1EtPuujmOfaiuiFFj7oU6rQ5lQOa4Ht1BB4EEbqy6SdBatDNUpf3KQkn97Rv1hxHaPJBtdBr6FdMcc/N3T6peTTYG02GZGVgkx3uc7yTejnTG6tYFtdFrR/7VQZqXdkO3/LCzVVvUY0cpUJsqn7T5J0tCHabX8QrW6AbiFuaTthcUJe3l1mjrDu6wXmLdEy9nt7Woy5on9dIhx/5mj6eQXGqVWrT4OA7QY81cdH8fr0amehXdRefecyId2OaRDttJBSyxRkVhnnD8G+wW4q25LYkFXVKuXmXHUqtf8AiBZVGM/PUKgrQQ6tQa0NfEdbKTvtuD3qkxLpdZQRSdcuaW+6abKbp/Y6pmMA82jnss0sMkbcflRa2aavjjWy2nlJb7z3uDKTOZe86Aet9EGPxBtrfWmH3db/AOSPZUG/4A9Yj/VGsbrmV3d1LgiQGsGrabZyjTfWS53+o6/JOZRDffcG9k6quPDW2Z83kuWl0bDEPxLxCr7tRtBp4Um9aOWd8nyAVL+fqFzalR76rmOFRpe9zzLTmBbmJgyOCCt3sdoAT2wY2/lTOIBj1K0qKRibs6b+O10H2ti4bVHucO51GR81xOqFvenmIe1wzCxxYK7T/wDk5tIT4QsDmnQ+fPsPauQwwhOa4heHRIFccEseCkVC0RqD/HavHXfIea44njzSI7U2m+ROy9QpBtk1xUIaSDrCpXuJMlJJSQzPE4JJInEjNkiUklxwxSU0klxwf0ZP/nKP+Y+q7Lj3/pa//wBNT/sckkpy7Hj0clpiGA8Y3QtSq7mUklckDiq4/qPmV57Ib9nMpJJWcWuBDPmD+sGxE6xJIPyCLq2zGu0a3XsB4jn3pJJxTPXF0+S0OIA4DT5bqChePk9b4D7JJLgoPo3bzu4+iVOHnmkkgFll0heTbWgOwN18alKVm3pJLn2BEu7QeOvwKaAkkm+gG1zrHCAVG8JJJZDILoHqjuUjkkkwD//Z',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <View style={styles.userContainer}>
                                <Text style={styles.userName}>John Smith</Text>
                            </View>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.editContainer}>
                                    <Button
                                        title="Edit"
                                        onPress={() => navigation.navigate('Edit')}
                                    />
                                </View>
                            </Col>
                            <Col>
                                <View style={styles.menuContainer}>
                                    <Button
                                        title="Menu"
                                        onPress={() => navigation.navigate('Menu')}
                                    />
                                </View>
                            </Col>
                            <Col>
                                <View style={styles.menuContainer}>
                                    <LogoutButton />
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>Likes</Text>
                            </Col>
                            <Col>
                                <Text>Followers</Text>
                            </Col>
                            <Col>
                                <Text>Following</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {posts.map((post, id) => {
                        return (
                            <View key={id} style={{ padding: 1 }}>
                                <Image
                                    style={{ width: width / 3 - 4, height: width / 3 - 4 }}
                                    source={{
                                        uri: post.url,
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingTop: 20,
    },
    profHeader: {
        backgroundColor: '#ffffff',
        color: 'black',
    },
    profPic: {
        backgroundColor: 'grey',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 75 / 2,
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    userName: {
        fontSize: 25,
        paddingBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    contentContainer: {
        borderTopColor: 'black',
        borderTopWidth: 2,
        paddingTop: 20,
    },
    content: {
        height: 125,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    editContainer: {
        padding: 1,
        borderColor: 'darkgrey',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
    },
    menuContainer: {
        padding: 1,
        borderColor: 'darkgrey',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
    },
});

export default ProfileScreen;
