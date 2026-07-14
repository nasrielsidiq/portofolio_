---
title: Membangun E-Commerce Mitra Batik dengan Laravel 11
date: 2026-07-14
author: Mucaa
category: project
tags: laravel, ecommerce, php, blade, project
thumbnail: https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800
---

# Membangun E-Commerce Mitra Batik dengan Laravel 11

Project e-commerce **Mitra Batik** dibangun menggunakan Laravel 11 untuk memamerkan dan menjual produk batik Indonesia secara online. Platform ini menyediakan pengalaman berbelanja yang mulus bagi pelanggan sekaligus panel admin yang komprehensif bagi pemilik toko.

## Tech Stack

Teknologi yang digunakan dalam project ini:

- **Laravel 11** - PHP framework untuk backend
- **Bootstrap 4** - CSS framework untuk responsive layout
- **Blade Templating** - Laravel's template engine
- **MySQL** - Database relasional
- **SweetAlert** - Alert & notification yang elegan
- **Poppins Font** - Typography modern untuk admin panel
- **Font Awesome** - Ikon konsisten di seluruh aplikasi

## Arsitektur Database

Project ini menggunakan 8 model utama yang saling terhubung:

| Model | Deskripsi |
|-------|-----------|
| `User` | Pengguna (admin & pelanggan) |
| `Item` | Produk batik |
| `Type` | Kategori produk |
| `Order` | Item di keranjang belanja |
| `Sell` | Transaksi yang sudah checkout |
| `PaymentType` | Metode pembayaran |
| `Specification` | Spesifikasi produk |
| `Receipt` | Bukti pembayaran |

Relasi antar model:
```
User → hasMany → Order → belongsTo → Item → belongsTo → Type
User → hasMany → Sell → belongsTo → PaymentType
Item → hasMany → Specification
```

## Fitur Utama

### 1. Public Storefront

Toko online yang menampilkan produk batik dengan desain elegan berbasis Colorlib Karma Shop template:

- **Homepage** dengan slider produk unggulan (Latest & Popular Products)
- **Detail Produk** dengan gambar besar, harga, kategori, stok, dan deskripsi
- **Add to Cart** dengan quantity selector
- **Shopping Cart** yang bisa update jumlah atau hapus item
- **Checkout** dengan pilihan metode pembayaran dan perhitungan shipping
- **Search & Filter** berdasarkan nama produk dan kategori

```php
// Controller home dengan search & filter
public function home(Request $request){
    $query = Item::with('type');
    if($request->search){
        $query->where(function($q) use ($request){
            $q->where('name', 'like', '%'.$request->search.'%')
              ->orWhere('description', 'like', '%'.$request->search.'%');
        });
    }
    if($request->category){
        $query->where('id_type', $request->category);
    }
    $data['items'] = $query->get();
    return view('index', $data);
}
```

### 2. Admin Panel

Panel admin dengan desain dark sidebar + gold accent (#c4a35a) yang menyediakan:

- **Dashboard** — statistik total produk, pesanan, pengguna, dan pendapatan
- **Manajemen Produk** — CRUD lengkap dengan upload gambar, pencarian, dan filter kategori
- **Manajemen Kategori** — tambah dan hapus kategori produk
- **Manajemen Pesanan** — lihat detail, update status (pending → processing → shipped → delivered / cancelled)
- **Manajemen Pengguna** — lihat daftar user, ban/unban akun
- **Notifikasi Stok Menipis** — peringatan otomatis untuk produk dengan stok ≤ 5

```php
// Dashboard statistics
$data = [
    'total_products' => Item::count(),
    'total_orders' => Sell::count(),
    'total_users' => User::where('is_admin', false)->count(),
    'total_revenue' => Sell::sum('bill'),
    'recent_orders' => Sell::with('user', 'payment')->latest()->take(5)->get(),
    'low_stock_items' => Item::where('stocks', '<=', 5)->take(5)->get(),
];
```

### 3. Autentikasi & Otorisasi

Sistem login/register dengan role-based access:

- **Guest** — hanya bisa melihat homepage
- **User** — bisa belanja, lihat keranjang, checkout, dan riwayat pesanan
- **Admin** — akses penuh ke panel admin

```php
// Middleware loginweb & admin
Route::middleware('loginweb')->group(function () {
    Route::middleware('admin')->prefix('admin')->group(function() {
        // Admin-only routes
    });
});
```

### 4. Shopping Cart & Checkout

Alur belanja yang lengkap:

1. Pilih produk → pilih quantity → Add to Cart
2. Cart otomatis merge jika produk yang sama ditambahkan lagi
3. Checkout → pilih metode pembayaran → konfirmasi
4. Status pesanan bisa dilacak di halaman "Pesanan Saya"

```php
// Order merger logic
$order = Order::where('id_item', $item->id)->where('id_user', $user->id)->first();
if ($order) {
    $qty = $order->qty + $request->qty;
    $order->update(['qty' => $qty, 'cost' => $item->cost * $qty]);
} else {
    Order::create([...]);
}
```

## Rute Utama

| Rute | Method | Deskripsi |
|------|--------|-----------|
| `/` | GET | Homepage toko |
| `/detail/{id}` | GET | Detail produk |
| `/order` | GET | Keranjang belanja |
| `/order/{id}` | POST | Tambah ke keranjang |
| `/transaksi` | GET/POST | Checkout & pembayaran |
| `/ordered` | GET | Riwayat pesanan user |
| `/admin/dashboard` | GET | Dashboard admin |
| `/admin/products` | GET | Manajemen produk |
| `/admin/orders` | GET | Manajemen pesanan |
| `/admin/users` | GET | Manajemen pengguna |

## Packages & Dependencies

- `laravel/sanctum` — API token authentication
- `tymon/jwt-auth` — JSON Web Token authentication
- `realrashid/sweet-alert` — Notifikasi popup yang menarik
- `twbs/bootstrap-icons` — Ikon Bootstrap

## Challenges & Solutions

### Challenge 1: Order Merger
**Problem**: User menambahkan produk yang sama ke keranjang, muncul duplikat.
**Solution**: Cek apakah item sudah ada di cart. Jika ya, update quantity & cost. Jika tidak, buat record baru.

### Challenge 2: Stok Validation
**Problem**: User bisa checkout melebihi stok yang tersedia.
**Solution**: Validasi stok di sisi server sebelum create/update order dan saat checkout.

### Challenge 3: Role-Based Routing
**Problem**: Admin dan user harus diarahkan ke halaman yang berbeda setelah login.
**Solution**: Cek `is_admin` pada user model, redirect ke `/admin` atau `/` sesuai role.

### Challenge 4: Admin Panel Design
**Problem**: Panel admin perlu desain yang berbeda dari storefront.
**Solution**: Gunakan layout terpisah (`admin/layouts/app.blade.php`) dengan dark sidebar + gold accent, responsive di mobile.

## Desain UI

### Storefront
Menggunakan template Colorlib "Karma Shop" dengan:
- Banner slider produk unggulan
- Grid produk responsive (4 kolom desktop, 2 kolom tablet, 1 kolom mobile)
- Exclusive deal section dengan countdown timer
- Brand partner logos

### Admin Panel
Custom CSS dengan:
- Dark sidebar (#1a1a2e) + Gold accent (#c4a35a)
- Stat cards dengan color-coded icons
- Responsive table dengan hover effects
- Mobile hamburger menu untuk sidebar

## Future Improvements

- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Email notification untuk status pesanan
- [ ] Product review & rating system
- [ ] Wishlist functionality
- [ ] Promo/coupon code system
- [ ] Laporan penjualan (export PDF/Excel)
- [ ] API endpoint untuk mobile app

## Kesimpulan

Project Mitra Batik merupakan contoh penerapan Laravel 11 untuk membangun e-commerce yang fungsional. Dari project ini, saya mempelajari:

- Arsitektur MVC dalam Laravel
- Relational database design dengan Eloquent ORM
- Blade templating dengan layout inheritance
- Role-based authentication & authorization
- Shopping cart logic & checkout flow
- Admin panel design & CRUD operations
- SweetAlert untuk enhanced UX

---

*Project ini masih dalam pengembangan dan akan terus di-improve dengan fitur-fitur baru.*
