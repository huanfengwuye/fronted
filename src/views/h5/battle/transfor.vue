<script setup>
import i18n from "@/lang"
const t = i18n.global.t
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

onMounted(() => {
	router.replace("/m/battleDetail?id=" + route.query.id + "&transfor=1");
});
</script>
