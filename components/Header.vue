<script setup lang="ts">
const localePath = useLocalePath()
const menuItems = ref([
    { name: 'Features', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
])
const open = ref(false)
const { locale, setLocale } = useI18n()
const changeLang = () => {
    const lang = locale.value == 'en' ? 'zh' : 'en'
    setLocale(lang)
}

// 监听用户网络状态
const { isOnline } = useOnline()
watch(isOnline, () => {
    if (!isOnline.value) {
        ElMessage.error('您的网络出小差了!')
    } else {
        ElMessage.success('网络已连接!')
    }
})

</script>

<template>
    <div class="lg:h-10 h-auto lg:flex bg-color lg:items-center px-4 lg:justify-between my-5">
        <div class="flex items-center justify-between">
            <div>
                <nuxt-link :to="localePath('/')">
                    <span class="font-bold text-slate-800 text-color ">{{ $t('header.frame') }}</span><span
                        class=" text-slate-500">{{ $t('header.projectName') }}</span>
                </nuxt-link>
            </div>
            <span class="lg:hidden flex items-center gap-x-1 cursor-pointer">
                <ThemeBtn />
                <div class="cursor-pointer text-color" @click="changeLang">{{ locale == 'en' ? '中文' : 'English' }}</div>
                <Icon name="uil:multiply" class="text-2xl dark:text-white" v-if="open" @click="open = !open"></Icon>
                <Icon name="uil:align-justify" class="text-2xl dark:text-white" v-else @click="open = !open"></Icon>
            </span>
        </div>
        <div class="lg:flex lg:items-center hidden lg:gap-6 flex-col lg:flex-row">
            <nuxt-link :to="localePath(page.path)" v-for="(page, index) in menuItems" :key="index">
                <span
                    class="block text-color h-10 leading-10 text-gray-500 hover:text-gray-900 dark:hover:text-slate-500">{{
                        $t(`header.${page.name}`) }}</span>
            </nuxt-link>
        </div>
        <div class="flex lg:hidden lg:items-center lg:gap-6 flex-col lg:flex-row" v-if="open">
            <nuxt-link :to="localePath(page.path)" v-for="(page, index) in menuItems" :key="index">
                <span
                    class="block text-color h-10 leading-10 text-gray-500 hover:text-gray-900 dark:hover:text-slate-500">{{
                        $t(`header.${page.name}`) }}</span>
            </nuxt-link>
        </div>
        <div class="lg:flex items-center gap-2 hidden">
            <ThemeBtn />
            <div id="language" class="cursor-pointer text-color" @click="changeLang">{{ locale == 'en' ? '中文' :
                'English' }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>