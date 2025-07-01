// components/common/AutoHeightWebView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

interface AutoHeightWebViewProps {
  htmlContent?: string;
  minHeight?: number;
}

const AutoHeightWebView: React.FC<AutoHeightWebViewProps> = ({
  htmlContent,
  minHeight = 100,
}) => {
  const [contentHeight, setContentHeight] = useState(minHeight);

  const handleWebViewMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message.startsWith("{") || message.startsWith("[")) {
      try {
        const data = JSON.parse(message);
        if (data?.type === "contentHeight") {
          setContentHeight(Math.max(data.height, minHeight));
        }
      } catch (err) {
        console.log("WebView message parse error:", err);
      }
    }
  };

  const injectedJavaScript = `
    (function() {
      function reportHeight() {
        const height = document.body.scrollHeight;
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: 'contentHeight',
          height: height
        }));
      }

      // Report height on load
      window.addEventListener('load', reportHeight);
      
      // Report height on resize
      window.addEventListener('resize', reportHeight);
      
      // Report height when content changes
      const observer = new MutationObserver(reportHeight);
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
      });

      // Initial height report
      setTimeout(reportHeight, 100);
    })();
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent! }}
      style={[styles.webview, { height: contentHeight }]}
      scrollEnabled={false}
      onMessage={handleWebViewMessage}
      injectedJavaScript={injectedJavaScript}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    // flex: 1,
  },
});

export default AutoHeightWebView;
