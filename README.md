# Fairview – Unbiased Hiring on LinkedIn

Fairview is a Chrome browser extension that removes unconscious bias from LinkedIn sourcing by blurring profile pictures, names, and premium badges, allowing you to focus on skills rather than appearance.

## 🚀 Features

- Automatically blurs **profile pictures**, **names**, and **LinkedIn subscriptions**.
- Toggle the blur effect on and off via the extension popup.
- Works seamlessly with LinkedIn's UI.

## 🌍 Browser Compatibility

Fairview is a Chrome extension designed for Chromium-based browsers. It has been tested and confirmed to work in:

✅ Brave
✅ Google Chrome
✅ Microsoft Edge

It should also work in other Chromium-based browsers like Opera and Vivaldi, though they have not been tested.

🚫 Not yet supported in Firefox, Safari, and other non-Chromium browsers.

## 📦 Usage

Currently only available through manual install.

1. Clone this repository

   ```sh
   git clone https://github.com/vmorsell/fairview.git
   cd fairview
   ```

2. Install dependencies and build the extension

   ```sh
   npm i
   ```

3. Build the extension

   ```sh
   npm run build
   ```

4. Load the extension in your browser

   - Navigate to `chrome://extensions`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked** and select the `dist/` folder

5. Open the plugin and enable blurring
6. For best experience, pin the plugin for easy access to the blur toggle

## 🛠 Development

To start the development mode with auto-rebuild:

```sh
npm run dev
```

To lint and format the code

```sh
npm run lint
npm run format
```

## 📜 License

MIT License. See `[LICENSE](LICENSE)` for details.

## 🤝 Contributing

Pull requests are welcome. Please ensure that any features aligns wiht the project's goals.
