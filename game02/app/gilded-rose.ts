export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  normalItemDegradeQuantity: number;
  conjuredItemDegradeQuantity: number;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.normalItemDegradeQuantity = 1;
    this.conjuredItemDegradeQuantity = this.normalItemDegradeQuantity * 2;
  }

  /**
   * Indicates if an item could increase the quality depending on his name
   */
  isIncreasingQualityItem(itemName: string) {
    if (
      itemName.startsWith("Aged Brie") ||
      itemName.startsWith("Backstage passes")
    ) {
      return true;
    }
    return false;
  }

  getBackstageAgedBrieQuality(days: number): number {
    if (days > 5 && days <= 10) return 2;

    if (days > 0 && days <= 5) return 3;

    return -1;
  }

  getItemsDegradeQuality(itemName: string, days: number): number {
    let degradeQuantity = this.normalItemDegradeQuantity;
    if (itemName.startsWith("Conjured")) {
      degradeQuantity = this.conjuredItemDegradeQuantity;
    }
    //Items that decreeese the quality
    if (days < 0) {
      degradeQuantity = degradeQuantity * 2;
    }
    return degradeQuantity;
  }

  updateQuality() {
    this.items.forEach((item) => {
      //Sulfuras items are outh of this method scope
      if (!item.name.startsWith("Sulfuras")) {
        item.sellIn -= 1;

        if (this.isIncreasingQualityItem(item.name)) {
          //If the item increase with the time
          if (item.sellIn < 0) {
            item.quality = 0;
          } else {
            item.quality += this.getBackstageAgedBrieQuality(item.sellIn);
          }
        } else {
          let degradeQuantity = this.getItemsDegradeQuality(
            item.name,
            item.sellIn
          );
          item.quality -= degradeQuantity;
        }
        // Quality cant be > 50
        if (item.quality > 50) {
          item.quality = 50;
        }
      }
      // Quality cant be < 0
      if (item.quality < 0) {
        item.quality = 0;
      }
    });
    return this.items;
  }
}
