<template>
    <div class="title">
        <span class="title_sub">Dulce espera!</span>
        <div class="gender">
            <h1 class="boy">NIÑO</h1>
            <span>o</span>
            <h1 class="girl">NIÑA</h1>
        </div>
    </div>
</template>

<style scoped>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--text-main);
}
.title_sub {
    font-size: var(--font-size-3);
    line-height: var(--font-size-3);
    margin-bottom: 1rem;
    font-weight: 600;
    font-family: var(--font-rubik);
}
.gender {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
}
.gender h1 {
    font-size: var(--font-size-1);
    line-height: var(--font-size-1);
    font-family: var(--font-luckiest-guy);
    margin-top: 36px;
}
.gender h1.boy {
    color: var(--bg-boy);
}
.gender h1.girl {
    color: var(--bg-girl);
}
.gender span {
    font-size: var(--font-size-2);
    line-height: var(--font-size-2);
    font-weight: 700;
    color: var(--text-secondary);
    font-family: var(--font-playwrite-au-qld);
}

@media (max-width: 780px) {
    .gender {
        flex-direction: column;
        gap: 0px;
    }
    .gender h1 {
        margin-top: 0px;
        line-height: 56px;
    }
    .gender h1.boy {
        margin: 64px 100px 0px 0px;
    }
    .gender h1.girl {
        margin-left: 100px;
    }
    .gender span {
        margin: 0px 0px 48px;
    }
}
</style>