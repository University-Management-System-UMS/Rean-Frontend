import { Color } from "@repo/colors";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { FontSize, Spacing, Text } from "@repo/ums-agent";
import { useTranslation } from "@/hooks/useTranslation";

interface Prop{
  title?: string,
  body?: string,
  image?: ImageSourcePropType
}

export default function NoMessage({ 
  title, 
  body, 
  image }: Prop){
    const { t } = useTranslation();
  return (
    
      <View style={styles.container}>
        {
          image ? 
          <Image source={image} style={styles.logo} resizeMode="contain" />
          : 
          <Image
            style={styles.logo}
            source={require("@/assets/images/clipboard.png")} />
        }
        <View>
          <Text variant="heading" style={styles.titleText}>{title || t('noMessage.title')}</Text>
          <Text style={styles.text}> {body || t('noMessage.body')}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({

  container:{
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 170,
    height: 170,
  },
  titleText:{
    fontSize: FontSize.xl,
    paddingBottom: Spacing.ms,
    textAlign: 'center',
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    color: Color.grayScale.grayOne,
    paddingHorizontal: Spacing["2xl"],
  },
});

