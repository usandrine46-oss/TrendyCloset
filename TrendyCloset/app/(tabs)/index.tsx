import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { Bell, Search, Home, ShoppingCart, CreditCard, User, Mic, Menu, Mail, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function TrendyClosetApp() {
  const [currentPage, setCurrentPage] = useState<'home' | 'details' | 'orders' | 'payment' | 'success'>('home');
  const [selectedCategory, setSelectedCategory] = useState('Man\'s');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'signature straight fit cord co-ord trouser in black',
      shortName: 'trouser in black',
      price: 76.00,
      designer: 'Calvin Klein',
      description: 'Crafted from a soft, stretch-friendly fabric for all-day ease. Features a straight fit design with comfortable waistband.',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
        'https://images.unsplash.com/photo-1475178626620-a4d3e4c162f4?w=600&q=80',
        'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80'
      ],
      category: 'Man\'s'
    },
    {
      id: 2,
      name: 'tuxedo suit in black',
      shortName: 'tuxedo suit in black',
      price: 143.00,
      designer: 'Hugo Boss',
      description: 'Premium tuxedo suit perfect for formal occasions. Tailored fit with satin lapels.',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
        'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=600&q=80'
      ],
      category: 'Man\'s'
    },
    {
      id: 3,
      name: 'hoodie',
      shortName: 'hoodie',
      price: 100.00,
      designer: 'Nike',
      description: 'Comfortable cotton blend hoodie with adjustable drawstring hood and kangaroo pocket.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
        'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&q=80'
      ],
      category: 'Man\'s'
    },
    {
      id: 4,
      name: 'heavyweight t-shirt',
      shortName: 'heavyweight t-shirt',
      price: 34.00,
      designer: 'Adidas',
      description: 'Premium heavyweight cotton t-shirt with reinforced stitching and comfortable fit.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
        'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80'
      ],
      category: 'Man\'s'
    }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setCurrentPage('orders');
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const deliveryFee = 2.00;

  // Success Page
  if (currentPage === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.successContainer}>
          <View style={styles.successCheckmark}>
            <Text style={styles.successCheckmarkText}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Delivery approved</Text>
          <Text style={styles.successMessage}>Your delivery was completelly successfully</Text>
          
          <TouchableOpacity 
            style={styles.successButton}
            onPress={() => {
              setCurrentPage('home');
              setCart([]);
            }}
          >
            <Text style={styles.successButtonText}>OK</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('home')}>
            <Home size={24} color="#FF6B35" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ShoppingCart size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Search size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <CreditCard size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Payment Page
  if (currentPage === 'payment') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={() => setCurrentPage('orders')} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailsHeaderTitle}>Payment Method</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Pay With Section */}
          <View style={styles.paymentSection}>
            <Text style={styles.paymentSectionTitle}>Pay With</Text>
            <View style={styles.cardLogos}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' }}
                style={styles.cardLogo}
              />
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }}
                style={styles.cardLogo}
              />
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg' }}
                style={styles.cardLogo}
              />
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' }}
                style={styles.cardLogo}
              />
            </View>
          </View>

          {/* Payment Amount */}
          <View style={styles.paymentAmountContainer}>
            <Text style={styles.paymentLabel}>Payment Amount</Text>
            <View style={styles.paymentAmountRow}>
              <Text style={styles.paymentAmount}>${(calculateSubtotal() + deliveryFee).toFixed(2)}</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Details Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Name on Card</Text>
            <TextInput 
              style={styles.formInput}
              placeholder="Enter name"
              placeholderTextColor="#ccc"
            />

            <Text style={styles.formLabel}>Card Number</Text>
            <TextInput 
              style={styles.formInput}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#ccc"
              keyboardType="number-pad"
            />

            <View style={styles.formRow}>
              <View style={styles.formColumn}>
                <Text style={styles.formLabel}>Expiry Date</Text>
                <TextInput 
                  style={styles.formInput}
                  placeholder="MM/YY"
                  placeholderTextColor="#ccc"
                />
              </View>
              <View style={styles.formColumn}>
                <Text style={styles.formLabel}>Security Code</Text>
                <TextInput 
                  style={styles.formInput}
                  placeholder="CVV"
                  placeholderTextColor="#ccc"
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.addToCartContainer}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => setCurrentPage('success')}
          >
            <Text style={styles.addToCartText}>Pay ${(calculateSubtotal() + deliveryFee).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('home')}>
            <Home size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ShoppingCart size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Search size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <CreditCard size={24} color="#FF6B35" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Orders/Cart Page
  if (currentPage === 'orders') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={() => setCurrentPage('home')} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailsHeaderTitle}>Orders</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.cartTitle}>Your Cart</Text>

          {/* Cart Items */}
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image 
                source={{ uri: item.image }}
                style={styles.cartItemImage}
              />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}

          {cart.length === 0 && (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          )}

          {/* Delivery Address */}
          {cart.length > 0 && (
            <>
              <View style={styles.deliverySection}>
                <Text style={styles.deliverySectionTitle}>Delivery Address</Text>
                <Text style={styles.deliveryName}>Cruise Z. darlene</Text>
                <Text style={styles.deliveryAddress}>2.34, Old brakes Blvd,</Text>
                <Text style={styles.deliveryAddress}>Los Angeles, CA</Text>
              </View>

              {/* Order Summary */}
              <View style={styles.orderSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery fee</Text>
                  <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.summaryTotal]}>
                  <Text style={styles.summaryTotalLabel}>Total</Text>
                  <Text style={styles.summaryTotalValue}>${(calculateSubtotal() + deliveryFee).toFixed(2)}</Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Pay Now Button */}
        {cart.length > 0 && (
          <View style={styles.addToCartContainer}>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => setCurrentPage('payment')}
            >
              <Text style={styles.addToCartText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('home')}>
            <Home size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ShoppingCart size={24} color="#FF6B35" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Search size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <CreditCard size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Details Page
  if (currentPage === 'details' && selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={() => setCurrentPage('home')} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailsHeaderTitle}>Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Product Image */}
          <View style={styles.mainImageContainer}>
            <Image 
              source={{ uri: selectedProduct.images[0] }}
              style={styles.mainProductImage}
            />
          </View>

          {/* Thumbnail Images */}
          <View style={styles.thumbnailContainer}>
            {selectedProduct.images.slice(1, 4).map((img: string, index: number) => (
              <View key={index} style={styles.thumbnailWrapper}>
                <Image 
                  source={{ uri: img }}
                  style={styles.thumbnailImage}
                />
              </View>
            ))}
          </View>

          {/* Featured Badge */}
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured on trending products</Text>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productPrice}>${selectedProduct.price.toFixed(2)}</Text>
          </View>

          {/* Designer Info */}
          <View style={styles.designerInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }}
              style={styles.designerImage}
            />
            <View style={styles.designerText}>
              <Text style={styles.designedByText}>Designed by</Text>
              <Text style={styles.designerName}>{selectedProduct.designer}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{selectedProduct.description}</Text>
            <Text style={styles.priceText}>${selectedProduct.price.toFixed(2)}</Text>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Add to Cart Button */}
        <View style={styles.addToCartContainer}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart(selectedProduct)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('home')}>
            <Home size={24} color="#FF6B35" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('orders')}>
            <ShoppingCart size={24} color="#999" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Search size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <CreditCard size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Home Page
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TrendyCloset</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Mail size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={22} color="#000" />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Menu size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#999" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Mic size={20} color="#999" />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Category Pills */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={[styles.categoryPill, selectedCategory === 'All' && styles.categoryPillActive]}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'All' && styles.categoryTextActive]}>
              All Categories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.categoryPill, selectedCategory === 'Man\'s' && styles.categoryPillActive]}
            onPress={() => setSelectedCategory('Man\'s')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'Man\'s' && styles.categoryTextActive]}>
              Man's
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.categoryPill, selectedCategory === 'Woman\'s' && styles.categoryPillActive]}
            onPress={() => setSelectedCategory('Woman\'s')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'Woman\'s' && styles.categoryTextActive]}>
              Woman's
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trending Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Products</Text>
          <TouchableOpacity>
            <ChevronRight size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {products
            .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
            .filter(p => searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productCard}
                onPress={() => {
                  setSelectedProduct(product);
                  setCurrentPage('details');
                }}
              >
                <Image 
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productCardName}>{product.shortName}</Text>
                <Text style={styles.productCardPrice}>${product.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('home')}>
          <Home size={24} color="#FF6B35" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentPage('orders')}>
          <ShoppingCart size={24} color="#999" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Search size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <CreditCard size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryPillActive: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productCardName: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  productCardPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Details Page Styles
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  mainImageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#F5F5F5',
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  thumbnailWrapper: {
    width: 80,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredBadge: {
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  featuredText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  designerInfo: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    alignItems: 'center',
    gap: 12,
  },
  designerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  designerText: {
    flex: 1,
  },
  designedByText: {
    fontSize: 12,
    color: '#666',
  },
  designerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  descriptionSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  addToCartContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Orders Page Styles
  cartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  cartItemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  emptyCart: {
    padding: 40,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
  },
  deliverySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  deliverySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  deliveryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#666',
  },
  orderSummary: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
    paddingTop: 15,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  // Payment Page Styles
  paymentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  cardLogos: {
    flexDirection: 'row',
    gap: 15,
  },
  cardLogo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  paymentAmountContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  paymentAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    marginTop: 15,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  formRow: {
    flexDirection: 'row',
    gap: 15,
  },
  formColumn: {
    flex: 1,
  },
  // Success Page Styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successCheckmark: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  successCheckmarkText: {
    fontSize: 60,
    color: '#000',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  successButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 12,
  },
  successButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    padding: 8,
    position: 'relative',
  },
});