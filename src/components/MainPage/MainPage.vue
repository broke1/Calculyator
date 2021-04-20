<template>
  <section class="main-container">
    <v-app class="container">
      <v-card
        class="mx-auto my-12 calc-cont"
      >
        <h1 class="title-calc">
          Calculator
        </h1>

        <div class="calc-computed-block">  
          <div class="calc-computed">
            <div class="calc-computed-label">
              Earnings
            </div>
            <div class="calc-computed-numb-block">
              <div class="calc-computed-sign dollar">
                $
              </div>
              <div class="calc-computed-numb">
                {{ earnings < 1 ? earnings.toFixed(1) : earnings.toFixed(0) }}
              </div>
            </div>
          </div>
          <div class="calc-computed">
            <div class="calc-computed-label">
              Cost of electricity 
            </div>
            <div class="calc-computed-numb-block">
              <div class="calc-computed-sign dollar">
                $
              </div>
              <div class="calc-computed-numb">
                {{ costElectricity < 1 ? costElectricity.toFixed(2) : costElectricity.toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="calc-header center-header"> 
          As a result
        </div>

        <div class="calc-computed-block">  
          <div class="calc-computed">
            <div class="calc-computed-label">
              Earnings on top
            </div>
            <div class="calc-computed-numb-block earning-block">
              <div class="calc-computed-sign dollar">
                $
              </div>
              <div class="calc-computed-numb">
                {{ earningsTop < 1 ? earningsTop.toFixed(2) : earningsTop.toFixed(0) }}
              </div>
            </div>
          </div>
          <div class="calc-computed">
            <div class="calc-computed-label">
              Discount on heating
            </div>
            <div class="calc-computed-numb-block procent">
              <div class="calc-computed-sign dollar">
                %
              </div>
              <div class="calc-computed-numb">
                {{ discHeat.toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
        <div class="calc-header slide-header"> 
          <span class="bitcoin-label">Bitcoin price, $</span>
          <span class="numb-slide">
            {{bitcoinValue == 0 ? 0 : `$ ${String(bitcoinValue).slice(0, String(bitcoinValue).length-3) },000` }}
          </span>
        </div>
        <div class="calc-block">
          <!-- <div class="calc-slider">
            <input 
              v-model="bitcoinValue" 
              type="range" 
              min="0" 
              max="100000" 
              step="1000" 
            > -->
            <!-- <div 
              class="tooltip"
              :style="{left: `${bitcoinTooltipPos}%`}"
            >
              {{ bitcoinValue }}
            </div> -->
            <!-- <div
              class="completed"
              :style="{width: `${bitcoinTooltipPos}%`}"
            />
          </div> -->
          <v-slider
            v-model="bitcoinValue"
            class="calc-slider"
            max="100000"
            min="0"
            step="1000" 
            hide-details
            color="#F15A24"
            track-color="rgba(51, 51, 51, 0.15)"
            thumb-color="#333333"
            :thumb-label="false"
            @end="setEarnings"
          />
          <div class="custom-ticks">
            <div 
              v-for="item in bitCoinTicksLabels" 
              :key="item.label"
              class="custom-tick"
              :class="`custom-tick-${item.label}`"
              :style="{left: `${item.left}%`}"
            >
              {{ item.label }}
            </div>
          </div>
          <div 
            class="current-tick" 
            :style="{left: `${bitcoinTooltipPosCurr}%`}"
          />
        </div>
        <div class="calc-header slide-header"> 
          <span>Hours per day your Heatbit is in use</span>
          <span class="numb-slide">{{ hoyrsPerDay }}</span>
        </div>
        <div class="calc-block">
          <!-- <div class="calc-slider">
            <input 
              v-model="hoyrsPerDay" 
              type="range" 
              min="0" 
              max="24" 
              step="1" 
            >
            <!-- <div 
              class="tooltip"
              :style="{left: `${perDayTooltipPos}%`}"
            >
              {{ hoyrsPerDay }}
            </div> -->
           <!-- <div
              class="completed"
              :style="{width: `${perDayTooltipPos}%`}"
            />
          </div> -->
          <v-slider
            v-model="hoyrsPerDay"
            max="24"
            min="0"
            step="1" 
            hide-details
            color="#F15A24"
            track-color="rgba(51, 51, 51, 0.15)"
            thumb-color="#333333"
            :thumb-label="false"
            @end="setEarnings(),setCostElectricity()"
          />
          <div class="custom-ticks perDayTicks">
            <div 
              v-for="item in hoyrsPerDayTicksLabels" 
              :key="item.label"
              class="custom-tick"
              :style="{left: `${item.left}%`}"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="calc-header slide-header"> 
          <span>Price of electricity, $/kWh</span>
          <span class="numb-slide">{{ `$ ${priceElec}` }}</span>
        </div>
        <div class="calc-block">
          <!-- <div class="calc-slider">
            <input 
              v-model="priceElec" 
              type="range" 
              min="0" 
              max="0.40" 
              step="0.01" 
            >
            <!-- <div 
              class="tooltip"
              :style="{left: `${perDayTooltipPos}%`}"
            >
              {{ hoyrsPerDay }}
            </div> -->
           <!-- <div
              class="completed"
              :style="{width: `${priceElecTooltipPos}%`}"
            />
          </div> -->
          <v-slider
            v-model="priceElec"
            max="0.40"
            min="0"
            step="0.01" 
            hide-details
            color="#F15A24"
            track-color="rgba(51, 51, 51, 0.15)"
            thumb-color="#333333"
            :thumb-label="false"
            @end="setCostElectricity"
          />
          <div class="custom-ticks priceElecTicks">
            <div 
              v-for="item in priceElecTicksLabels" 
              :key="item.label"
              class="custom-tick"
              :style="{left: `${item.left}%`}"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>


        <div 
          class="time-period-block"
          :class="{period_block_row: !mobile}"
        >
          <div class="calc-header time-header"> 
            Time period 
          </div>
          <div
            v-if="mobile" 
            class="calc-block calc-block-select"
            v-on:click="setColor"
          >
            <v-select
              v-model="timePeriod"
              :items="timeOption"
              color="#F15A24"
              solo
              flat
              background-color="transparent"
              placeholder="6 month"
              @change="setEarnings(),setCostElectricity()"
            />
          </div>
          <v-card-text 
            v-if="!mobile" 
            class="calc-block calc-block-radio"
          >
            <div 
              v-for="option in timeOption"
              :key="option"
              class="radio-group"
            >
              <input 
                :id="option" 
                v-model="timePeriod"
                type="radio"
                :value="option" 
                @change="setEarnings(),setCostElectricity()"
              >
              <label :for="option">{{ option }}</label>
            </div>
          </v-card-text>
        </div>
        <div class="customer_warning">
          Actual results may be different. This calculator is for illustration purposes only
        </div>
      </v-card>
    </v-app>
  </section>
</template>

<script>
//import ThemeBlock from '../ThemeBlock/ThemeBlock.vue'


export default {
  //components: { ThemeBlock },
  data () {
    return {
      bitcoinValue: 55000,
      bitcoinTooltipPos: 1,
      bitcoinTooltipPosCurr: 1,
      bitCoinTicksLabels: [
        {label: "0",left: 0},
        {label: "20k",left: 19},
        {label: "40k",left: 38.5},
        {label: "60k",left: 58},
        {label: "80k",left: 78},
        {label: "100k",left: 97},
      ],
      hoyrsPerDay: 0,
      perDayTooltipPos: 0,
      hoyrsPerDayTicksLabels: [
        {label: "0",left: 0.5},
        {label: "1.5",left: 5.5},
        {label: "3",left: 13},
        {label: "4.5",left: 18},
        {label: "6",left: 25.5},
        {label: "7.5",left: 30},
        {label: "9",left: 37.5},
        {label: "10.5",left: 41.5},
        {label: "12",left: 49},
        {label: "13.5",left: 53.5},
        {label: "15",left: 61.5},
        {label: "16.5",left: 66.5},
        {label: "18",left: 73.5},
        {label: "19.5",left: 78},
        {label: "21",left: 86},
        {label: "22.5",left: 90.5},
        {label: "24",left: 98.5},
      ],
      priceElec: 0,
      priceElecTooltipPos: 0,
      priceElecTicksLabels: [
        {label: "0",left: 1},
        {label: "0.04",left: 8.5},
        {label: "0.08",left: 18},
        {label: "0.12",left: 28},
        {label: "0.16",left: 38},
        {label: "0.2",left: 49},
        {label: "0.24",left: 57.5},
        {label: "0.28",left: 67.5},
        {label: "0.32",left: 77.5},
        {label: "0.36",left: 87},
        {label: "0.4",left: 98},
      ],
      timePeriod: "6 month",
      timeOption: ["Daily","Monthly","Quarterly","6 month","1 year", "2 years"],
      curElem: 'bitCoin',
      mobile: false,
      earnings: 0,
      costElectricity: 0,
      discHeat: 0,
      earningsTop: 0,
    }
  },
  watch: {
    // bitcoinValue: function (val) {
    //   this.moveTooltip(val,100000,'bitCoin')
    // },
    // hoyrsPerDay: function (val) {
    //   this.moveTooltip(val,24,'perDay')
    // },
    // priceElec: function (val) {
    //   this.moveTooltip(val,0.40,'priceElec')
    // },
    earnings: function () {
      this.setDiscHeat()
      this.setEarningsTop()
    },
    costElectricity: function () {
      this.setDiscHeat()
      this.setEarningsTop()
    }
  },
  methods: {
    setEarnings: function () {
      this.earnings = 14/154000000*24*6*6.25*this.bitcoinValue*this.beatyTimePeriod(this.timePeriod)*this.hoyrsPerDay/24
    },
    setCostElectricity: function () {
      this.costElectricity = 1.3*this.hoyrsPerDay*this.beatyTimePeriod(this.timePeriod)*this.priceElec
    },
    setDiscHeat: function() {
      if (this.earnings == 0 && this.costElectricity == 0) {
        this.discHeat = 0
      }
      if (this.earnings > this.costElectricity) {
        this.discHeat = 100
      } else {
        this.discHeat = this.earnings/this.costElectricity*100
      } 
    },
    setEarningsTop: function() {
      if (this.earnings == 0 && this.costElectricity == 0) {
        this.earningsTop = 0
      }
      if (this.earnings < this.costElectricity) {
        this.earningsTop = 0
      } else {
        this.earningsTop = this.earnings-this.costElectricity
      } 
    },
    beatyTimePeriod: function(time) {
      let beatytime = 1
      switch(time) {
      case"Daily":
        beatytime = 1
        break
      case"Monthly":
        beatytime = 30.5
        break
      case"Quarterly":
        beatytime = 92
        break
      case"6 month":
        beatytime = 183
        break
      case"1 year":
        beatytime = 365
        break
      case"2 years":
        beatytime = 730
        break
      }
     
      return beatytime
    },
    moveTooltip: function(val,max,elem) {
      let procent =  ((val*100)/max)-0.8

    
      // if (procent > 15 && procent < 50) {
      //   procent = procent-0.8
      // } else if (procent >= 50 && procent < 80) {
      //   procent = procent-1.8
      // } else if (procent >= 80) {
      //   procent = procent-2.2
      // } 

      
      // if (procent == 0) {
      //   procent = 1
      // } else if(procent == 100) {
      //   procent = 99
      // }

      if (screen.width <= 640) {
        procent = procent - 0.2
      } 
      if (screen.width <= 480) {
        procent = procent - 0.7
      }
      if (screen.width <= 320) {
        procent = procent - 1
      }

      

      switch(elem){
      case"bitCoin":
        this.bitcoinTooltipPos = procent
        break
      case"perDay":
        this.perDayTooltipPos = procent
        break
      case"priceElec":
        this.priceElecTooltipPos = procent
        break
      case "bitCoinCurr":
        this.bitcoinTooltipPosCurr = procent
        break
      
      }
    },
    getBitCoin: async function() {
      let response = await fetch(`https://api.heatbit.com/api/v1.0/exchange/btc_rate?round_to=-3`, {
        //mode: 'cors',
      })
        .catch (error => {
          console.log(error)
        }) 
      if (response.status == 200) { 
        await response.json().then( res => { 
          this.bitcoinValue  = res.BTC
          this.moveTooltip(res.BTC,100000,'bitCoinCurr')
          this.setEarnings()
        }).catch( error => {
          console.log(error)
        }) 
      }  
    },
    setColor: function() {
      setTimeout( () => {
        document.querySelectorAll('.v-list-item').forEach( item => {
          if (item.getAttribute('aria-selected') == "true") {
            item.classList.remove('primary--text')
            item.style.background = "linear-gradient(90deg, rgba(241, 90, 36, 0.1) 0.01%, rgba(237, 47, 36, 0.1) 100.04%)"
          } else {
            item.style.background = "transparent"
          }
        })
      },0)
    }
  },
  created() {
    this.hoyrsPerDay = 24
    this.priceElec = 0.10
    this.getBitCoin()
    if (screen.width < 500) {
      this.mobile = true
    }
    window.addEventListener(`resize`, event => {
      if (screen.width < 500) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    }, false);
    
  },
  mounted() {
    document.querySelectorAll('.v-slider--horizontal').forEach( item => {
      item.style.margin = '0'
    })
    document.querySelectorAll('.v-slider__track-fill').forEach( item => {
      item.style.borderRadius = '100px'
    })
    document.querySelectorAll('.v-slider__track-container').forEach( item => {
      item.style.height = '4px'
      item.style.zIndex = '1'
    })
    document.querySelectorAll('.v-slider__thumb-container').forEach( item => {
      item.style.zIndex = '3'
    })
    document.querySelectorAll('.v-slider__thumb').forEach( item => {
      item.style.width = "16px"
      item.style.height = "16px"
      item.style.cursor = "pointer"
    })
    this.setEarnings()
    this.setCostElectricity()
  }
}
</script>

<style lang="sass" scoped> 
    @import './MainPage.sass'
    
</style>

