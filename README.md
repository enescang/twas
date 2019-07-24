npm i react-native-input-scroll-view kurmanız gerekiyor.

//05.07.2019 @canesnet
+notların renklendirilmesi.
+textInput içerisine uzun yazı eklendiğinde oluşan sıkıntının giderilmesi.
+Güncelleme ve not ekleme kısımlarının tasarımı aynı yapıldı.
+Main.js içinde borderRadius uygulandı.
+Addnote.js içinde fontSize uygulandı.

//07.07.2019 @canesnet
+Addnote.js ve Show.js içerisinde geri tuşuna basınca not kaydetme ve not güncelleme yapmaktadır.
+Main.js içinde notlara uzun basınca düzenle/sil için Alert eklendi henüz düzenle/sil çalışmamaktadır.


//09.07.2019 @canesnet
+Güncellem kısmına Okuma Modu eklendi.
+Not Güncelleme kısmına Panoya Kopyala Özelliği eklendi.

//11.07.2019 @canesnet
+Menüyü kurmak için npm install react-native-side-menu --save

//12.07.2019
+Addnote.js ve Show.js içerisindeki Okuma Modu özelliğine, eğer yazı içerisinde link varsa onu tıklanabilir hale getirmek için paket kuruldu:</br>
npm i --save react-native-hyperlink<br>

//14.07.2019
+SignUp.js, Login.js, Forgotpassword.js içindeki inputlar boş gidince uyarı vermesi eklendi. @yasuo and @canesnet<br>

//16.07.2019 @canesnet
react-native-image-picker@0.27.2 paketini kurmanız gerekiyor.<br>
Daha sonra<br> 
react-native link react-native-image-picker<br>

//18.07.2019<br>
Dosyalama işlemleri için paket indirildi => rn-fetch-blob<br>
npm install rn-fetch-blog@0.10.13 --save<br>
react-native link rn-fetch-blob<br>
android/build.gradle 39 ve 42. satırlara kod ve açıklaması eklendi bu otomatik olarak github ile gelecektir.

Image Picker ile android kısmında kırpma sorunu olduğu için <br> 
react-native-image-crop-picker@0.24.1 paketi kuruldu<br>
react-native link react-native-image-crop-picker<br>
Profil.js oluşturuldu.<br>

//19.07.2019<br>
Firebase'da SQL'deki gibi where komutunu kullanmak için örnek:<br>
..... .orderByChil('placeId').equalTo('1')  ......<br>

//22.07.2019<br>
Cihazın dil ayarlarına göre "strings" leri değişmeye yarayan paket<br>
npm install react-native-localization<br>
react-native link react-native-localization<br>
<br>
Profil.js için TR/EN 
src/components/Localization.js içinde dil ayarları yapıldı<br>

//24.07.2019<br>
About.js dışındaki sayfalara TR/EN dil ayarları yapıldı.<br>
**v0.1** 



