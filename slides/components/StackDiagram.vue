<template>
  <div class="stack-wrap" aria-label="A hunger_api stack from Entity to ServiceImpl on top of dev">
    <VClick :at="4">
      <div class="stack-layer layer-service-impl">
        <div>
          <span class="layer-position">4 / 4</span>
          <span class="layer-copy"><strong>ServiceImpl</strong><small>Business logic</small></span>
        </div>
        <span class="layer-kind">IMPLEMENT</span>
      </div>
      <div class="connector" />
    </VClick>

    <VClick :at="3">
      <div class="stack-layer layer-api-spec">
        <div>
          <span class="layer-position">3 / 4</span>
          <span class="layer-copy"><strong>ApiSpec</strong><small>Controller · Service interface</small></span>
        </div>
        <span class="layer-kind">CODEGEN</span>
      </div>
      <div class="connector" />
    </VClick>

    <VClick :at="2">
      <div class="stack-layer layer-model-spec">
        <div>
          <span class="layer-position">2 / 4</span>
          <span class="layer-copy"><strong>ModelSpec</strong><small>DTO · Req · Builder</small></span>
        </div>
        <span class="layer-kind">CODEGEN</span>
      </div>
      <div class="connector" />
    </VClick>

    <VClick :at="1">
      <div class="stack-layer layer-entity">
        <div>
          <span class="layer-position">1 / 4</span>
          <span class="layer-copy"><strong>Entity</strong><small>Schema · Migration · DAO</small></span>
        </div>
        <span class="layer-kind">FOUNDATION</span>
      </div>
      <div class="connector" />
    </VClick>

    <div class="trunk">dev</div>

    <VClick :at="5">
      <div class="diagram-caption">每個 PR 只顯示自己這一層的 diff</div>
    </VClick>
  </div>
</template>

<style scoped>
.stack-wrap {
  display: flex;
  min-height: 445px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stack-layer {
  display: flex;
  width: 500px;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
  border: 1px solid;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgb(31 35 40 / 8%);
}

.stack-layer > div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stack-layer strong {
  color: #172033;
  font-size: 17px;
  letter-spacing: -0.01em;
}

.layer-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer-copy small {
  color: #637083;
  font-size: 11px;
  line-height: 1.1;
}

.layer-position {
  display: inline-grid;
  min-width: 42px;
  height: 28px;
  place-items: center;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
}

.layer-kind {
  border-radius: 999px;
  background: #f0f3f6;
  color: #637083;
  padding: 5px 9px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.layer-service-impl { border-color: #c9b4f5; }
.layer-service-impl .layer-position { background: #f1e5ff; color: #6639ba; }
.layer-api-spec { border-color: #9ac7f3; }
.layer-api-spec .layer-position { background: #ddf4ff; color: #0969da; }
.layer-model-spec { border-color: #e7b77e; }
.layer-model-spec .layer-position { background: #fff1e5; color: #9a3e00; }
.layer-entity { border-color: #9dd8aa; }
.layer-entity .layer-position { background: #dafbe1; color: #1f883d; }

.connector {
  width: 2px;
  height: 12px;
  background: #aab4c3;
}

.trunk {
  display: grid;
  min-width: 104px;
  height: 38px;
  place-items: center;
  border-radius: 999px;
  background: #eaeef2;
  color: #445166;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 15px;
  font-weight: 750;
}

.diagram-caption {
  margin-top: 18px;
  padding: 9px 15px;
  border-radius: 999px;
  background: #dafbe1;
  color: #116329;
  font-size: 14px;
  font-weight: 750;
}
</style>
