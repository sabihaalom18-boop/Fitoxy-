# Fitoxy AI — Starter Prototype

এটি Fitoxy AI-এর প্রথম **frontend prototype**। এখনই ব্রাউজারে চালানো যায় এবং Cloudflare Pages-এর মতো static hosting-এ publish করা যায়।

## এখন কী কাজ করে?
- Responsive dashboard ও sidebar navigation
- Premium dark/light appearance toggle
- Food photo select/preview
- Demo nutrition card (বাস্তব AI analysis নয়)
- Fit Go routine cards ও sample steps
- Sample progress charts
- Demo AI Coach chat
- Mobile-friendly layout

## এখনো কী যুক্ত হয়নি?
- Real AI / food image recognition API
- User signup/login
- Database ও cloud sync
- Real steps/activity tracking
- Payments/subscriptions
- Production security, privacy controls ও health-data safeguards

**গুরুত্বপূর্ণ:** Food Scanner-এর সংখ্যাগুলো demo/sample। ছবি থেকে কোনো বাস্তব AI analysis হচ্ছে না। Demo chat-এর উত্তরও prewritten।

## Local-এ চালানো
1. ZIP extract করো।
2. `index.html` ফাইলে tap/double-click করে browser-এ খোলো।
3. আরও ভালোভাবে পরীক্ষা করতে VS Code-এর Live Server বা যেকোনো local static server ব্যবহার করতে পারো।

এটি HTML/CSS/JavaScript prototype, তাই প্রথম preview-র জন্য Node.js দরকার নেই।

## Cloudflare Pages-এ publish (static)
1. নিজের GitHub account-এ নতুন repository বানাও, যেমন `fitoxy-ai`.
2. ZIP extract করে সব ফাইল repository-তে upload করো: `index.html`, `styles.css`, `app.js`, `README_BN.md`.
3. Cloudflare dashboard-এ Pages project তৈরি করে GitHub repository connect করো।
4. Framework preset: **None**; build command ফাঁকা; output directory ` / ` বা repository root হিসেবে provider-এর UI-তে যে root option আছে সেটি বেছে নাও।
5. Deploy করো এবং generated URL-এ পরীক্ষা করো।

Provider-এর UI পরিবর্তিত হতে পারে। যদি upload/deploy-এ সমস্যা হয়, error screenshot পাঠাও।

## পরের ধাপ
1. UI feedback ঠিক করা।
2. Auth + database design করা।
3. Server-side AI endpoint বানানো—API key কখনো `app.js` বা public frontend-এ রাখা যাবে না।
4. Real AI feature, error handling, rate limits ও privacy controls যুক্ত করা।
5. Real users-কে দেওয়ার আগে security, accessibility ও nutrition estimates পরীক্ষা করা।

## Project structure
- `index.html` — app pages/structure
- `styles.css` — design, responsive layout, dark/light appearance
- `app.js` — navigation and demo interactions

Fitoxy AI-এর নাম/brand assets ও live service terms ব্যবহারের আগে প্রয়োজনীয় rights ও terms যাচাই করবে।
