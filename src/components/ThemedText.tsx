import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({
                             type = 'default',
                             className = '',
                             ...rest
                           }: ThemedTextProps) {

      let textClasses = "";

      if (type === 'default') {
        textClasses += "text-base leading-6";
      } else if (type === 'defaultSemiBold') {
        textClasses += "text-base leading-6 font-semibold";
      } else if (type === 'title') {
        textClasses += "text-3xl font-bold leading-8";
      } else if (type === 'subtitle') {
        textClasses += "text-xl font-bold";
      } else if (type === 'link') {
        textClasses += "text-base leading-7 text-[#0a7ea4]";
      }

      return (
          <Text
              className={`dark:text-text-dark ${textClasses} ${className}`}
              {...rest}
          />
      );
}
