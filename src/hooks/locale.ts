import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';

export default function useLocale() {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return 'en-US';
  });
  const changeLocale = (value: string) => {
    if (i18.locale.value === value) {
      return;
    }
    i18.locale.value = 'en-US';
    localStorage.setItem('arco-locale', 'en-US');
    Message.success(i18.t('navbar.action.locale'));
  };
  return {
    currentLocale,
    changeLocale,
  };
}
