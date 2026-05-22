import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { sizing } from "../../utils";

interface AvatarProps {
  name: string;
  size?: number;
  online?: boolean;
}

const DOG_IMAGES: ImageSourcePropType[] = [
  require("../../../assets/dogs/dog-1.webp"),
  require("../../../assets/dogs/dog-2.webp"),
  require("../../../assets/dogs/dog-3.webp"),
  require("../../../assets/dogs/dog-4.webp"),
  require("../../../assets/dogs/dog-5.webp"),
  require("../../../assets/dogs/dog-6.webp"),
];

function getDogImage(name: string): ImageSourcePropType {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return DOG_IMAGES[Math.abs(hash) % DOG_IMAGES.length];
}

export default function Avatar({
  name,
  size = sizing.avatar.md,
  online,
}: AvatarProps) {
  const image = getDogImage(name);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={image}
        style={[styles.image, { width: size, height: size }]}
      />
      {online && (
        <View
          style={[
            styles.onlineDot,
            {
              width: size * 0.25,
              height: size * 0.25,
              borderRadius: size * 0.125,
              right: 2,
              bottom: 2,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  onlineDot: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
});
