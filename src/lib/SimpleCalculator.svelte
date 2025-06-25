<script lang="ts">
  import { onMount } from "svelte";
  import { calculateDamage, getWeaponEffect } from "../models/Damage";
  import { Weapon, weaponMap, weapons } from "../models/Item";
  import { characterStatuses, Status, statusMap } from "../models/Status";
  import { SimpleCalculatorSaver } from "../models/Saver";

  let currentWeapon = $state<Weapon>(Weapon.OneHandedSword);
  let currentStatus = $state({
    [Status.STR]: 4,
    [Status.DEX]: 4,
    [Status.INT]: 4,
    [Status.LUK]: 4,
    [Status.ATK]: 0,
    [Status.Mastery]: 60,
  });

  onMount(() => {
    const saveData = SimpleCalculatorSaver.load();
    if (saveData) {
      currentWeapon = saveData.weapon as Weapon;
      currentStatus = saveData.status;
    }
  });

  $effect(() => {
    SimpleCalculatorSaver.save({
      weapon: currentWeapon,
      status: currentStatus,
    });
  });

  let currentCharacterStatuses = $derived.by(() => {
    const weaponEffect = getWeaponEffect(currentWeapon);
    return characterStatuses.map((characterStatuses) => ({
      key: characterStatuses,
      name: statusMap[characterStatuses],
      isPrimary: weaponEffect.primary === characterStatuses,
      isSecondary: weaponEffect.secondary.includes(characterStatuses),
    }));
  });

  let damage = $derived(calculateDamage(currentWeapon, currentStatus));
</script>

<h3 class="text-xl">物理攻擊力: {damage.min} ~ {damage.max}</h3>

<label class="select w-full">
  <span class="label">武器</span>
  <select bind:value={currentWeapon}>
    {#each weapons as weapon}
      <option value={weapon}>{weaponMap[weapon]}</option>
    {/each}
  </select>
</label>

<div class="flex flex-col gap-1">
  {#each currentCharacterStatuses as { key, name, isPrimary, isSecondary }}
    <label
      class={[
        "input w-full",
        isPrimary && "input-primary",
        isSecondary && "input-secondary",
      ]}
    >
      <span class="label">{name}</span>
      <input
        type="number"
        bind:value={currentStatus[key]}
        min="4"
        max="9999"
        step="1"
      />
      {#if isPrimary}
        <span class="label">主屬性</span>
      {/if}
      {#if isSecondary}
        <span class="label">副屬性</span>
      {/if}
    </label>
  {/each}
</div>

<div class="flex flex-col gap-1">
  <label class="input w-full">
    <span class="label">{statusMap[Status.ATK]}</span>
    <input
      type="number"
      bind:value={currentStatus[Status.ATK]}
      min="0"
      max="9999"
      step="1"
    />
  </label>
  <label class="input w-full">
    <span class="label">{statusMap[Status.Mastery]}</span>
    <input
      type="number"
      bind:value={currentStatus[Status.Mastery]}
      min="0"
      max="100"
      step="5"
    />
    <span class="label">%</span>
  </label>
</div>
