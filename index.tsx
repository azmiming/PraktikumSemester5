import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const services = [
  { name: "GoRide", price: "5RB!", iconName: "motorbike" },
  { name: "GoCar", price: "6RB!", iconName: "car" },
  { name: "GoFood", discount: "-50%", iconName: "food" },
  { name: "GoSend", price: "5RB!", iconName: "truck-delivery" },
  { name: "GoMart", discount: "-60%", iconName: "shopping" },
  { name: "GoPay Pinjam", amount: "25JUTA", iconName: "wallet" },
  { name: "GoFood PAS", label: "HEMAT", iconName: "food-fork-drink" },
  { name: "GoShare", price: "4RB!", iconName: "share" },
];

const promoItems = [
  {
    id: 1,
    image: "https://awsimages.detik.net.id/community/media/visual/2022/06/16/ilustrasi-es-krim-stroberi-1.jpeg?w=1200",
    text: "Es Krim Stroberi",
  },
  {
    id: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgkOqBZLZVFhhBKjRFuwV4Mb4Zxgg43D5C_A&s",
    text: "Es Boba",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3EsX7-v02dRPoFDG4-Cgtz4jNFjpHtUsqGg&s",
    text: "Ice Cofee",
  },
];

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.48;
const SPACING = width * 0.04;

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<TextInput>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleSearchPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Previous components remain the same until promoContainer */}

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
          <Icon name="magnify" size={24} color="#c4c4c4" style={styles.searchIcon} />
          <TextInput ref={inputRef} style={styles.searchInput} placeholder="Bakso" placeholderTextColor="#c4c4c4" value={searchQuery} onChangeText={setSearchQuery} />
          <Icon name="account-circle" size={28} color="#ffffff" style={styles.personalIcon} />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <Image source={{ uri: "https://www.masakapahariini.com/wp-content/uploads/2019/11/makanan-fast-food-3.jpg" }} style={styles.bannerImage} />
        <Text style={styles.promoText}>Menu bikin kenyang dari 10 ribuan</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceLeft}>
          <Text style={styles.balanceText}>Rp 500.000</Text>
          <Text style={styles.coinsText}>0 coins</Text>
        </View>
        <View style={styles.balanceOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="cash" size={24} color="#4CAF50" />
            <Text style={styles.optionText}>Bayar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="bank-transfer-in" size={24} color="#4CAF50" />
            <Text style={styles.optionText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="dots-horizontal" size={24} color="#4CAF50" />
            <Text style={styles.optionText}>Lainnya</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <Icon name={service.iconName} size={24} color="#4CAF50" style={styles.serviceIcon} />
            <Text style={styles.serviceName}>{service.name}</Text>
            {service.price && (
              <View style={styles.priceBox}>
                <Text style={styles.serviceDetail}>{service.price}</Text>
              </View>
            )}
            {service.discount && (
              <View style={styles.discountBox}>
                <Text style={styles.serviceDetail}>{service.discount}</Text>
              </View>
            )}
            {service.amount && (
              <View style={styles.amountBox}>
                <Text style={styles.serviceDetail}>{service.amount}</Text>
              </View>
            )}
            {service.label && <Text style={styles.serviceLabel}>{service.label}</Text>}
          </View>
        ))}
      </View>

      {/* Animated Promo Container */}
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.promoScrollContainer}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      >
        {promoItems.map((item, index) => {
          const inputRange = [(index - 1) * (ITEM_WIDTH + SPACING), index * (ITEM_WIDTH + SPACING), (index + 1) * (ITEM_WIDTH + SPACING)];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.promoBox,
                {
                  transform: [{ scale }],
                  width: ITEM_WIDTH,
                  marginRight: SPACING,
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.promoImage} />
              <Text style={styles.promoItemText}>{item.text}</Text>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... previous styles remain the same ...
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  headerContainer: {
    padding: 16,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "80%",
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  personalIcon: {
    marginLeft: 8,
  },
  promoBanner: {
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 150,
  },
  promoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
    borderRadius: 4,
  },
  balanceContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    height: 80,
  },
  balanceLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  balanceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  coinsText: {
    fontSize: 14,
    color: "#888",
  },
  balanceOptions: {
    flexDirection: "row",
  },
  optionButton: {
    alignItems: "center",
    marginLeft: 16,
  },
  optionText: {
    fontSize: 12,
    marginTop: 4,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "22%",
  },
  serviceIcon: {
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  serviceDetail: {
    fontSize: 10,
    color: "#333",
  },
  serviceLabel: {
    fontSize: 10,
    color: "red",
  },
  priceBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  discountBox: {
    backgroundColor: "#ffeb3b",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  amountBox: {
    backgroundColor: "#b3e5fc",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  promoScrollContainer: {
    paddingHorizontal: SPACING,
    paddingVertical: 16,
  },
  promoBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promoImage: {
    height: 100,
    width: "100%",
    borderRadius: 8,
  },
  promoItemText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "500",
  },
});

export default App;