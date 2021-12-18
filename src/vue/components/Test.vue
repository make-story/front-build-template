<template>
    <div>
        <h2>{{test}}</h2>
        <hr />
        <h2>{{sayTest}}</h2>
        <button @click="callTest">버튼</button>
    </div>
</template>

<script>
export default {
    props: {
        // data() 에 있는 것과 같은 이름 사용 불가능
        propTest: {
            type: String,
            default: '기본값 입력',
        }
    },
    data() {
        return {
            test: 'TEST',
        }
    },
    computed: {
        sayTest() {
            return this.propTest;
        }
    },
    methods: {
        callTest() {
            alert(this.propTest);
        }
    }
}
</script>