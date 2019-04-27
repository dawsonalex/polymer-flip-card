import { LitElement, html } from 'lit-element';

/**
 * `flip-card`
 * A card component based on the code-it notes by Dan Harding &lt;https://dev.to/danielharding&gt;
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FlipCard extends LitElement {
  render() {
    return html`
      <style>
        :host {
          width:300px;
          height:auto;
          display: inline-block;
        }

        :host * {
          box-sizing: border-box;
        }

        header.banner{
          align-items: center;
          border-radius: 5px 5px 0 0;
          border:1px solid black;
          background-color: ${this._bannerBackgroundColour};
          color: ${this._bannerTextColour};
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          padding: .5em;
        }

        #front main,
        #back main {
          font-family: 'Poppins', sans-serif;
          padding: 0.75rem;
        }

        #card {
          background-color: transparent;
          width: 100%;
          perspective: 1000px; /* Remove this if you don't want the 3D effect */
          position: relative;
          flex: 1 1 auto;
          transition: height 0.2s;
        }

        /* Used to style the front and back sides of the card*/
        .card {
          color: ${this._mainTextColour};
          background: ${this._mainBackgroundColour};
          border-right: 4px solid ${this.accent};
          border-bottom: 4px solid ${this.accent};
          border-left: 4px solid ${this.accent};
          border-top: 4px solid ${this.accent};
          border-radius: 10px 10px 10px 10px;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
          transition: transform 0.5s ease-in-out;
					overflow: hidden;
        }

        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
        }

        /* Style the back side */
        .flip-card-back {
          transform: rotateY(180deg);
        }

        .flip-button {
          position:absolute;
					width: 80px;
					height: 80px;
          right: -40px;
          bottom: -40px;
          cursor: pointer;

					border: 4px solid ${this.accent};
					background: ${this.accent};
					border-radius: 50%;
        }

				.flip-button-icon {
					display:inline-block;
					position: relative;
					top: -14px;
					left: -14px;
					width:20px;
					height:20px;
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M8.192 0C4.638 6.439 4.039 16.259 18 15.932V8l12 12-12 12v-7.762C1.282 24.674-.58 9.481 8.192 0z"/></svg>');
					background-repeat: no-repeat;
					background-size: contain;
				}

        :host([facedown]) .flip-card-front {
          transform: rotateY(180deg);
        }

        :host([facedown]) .flip-card-back {
          transform: rotateY(0deg);
        }

        .animateJump .card {
          animation: jump 0.4s linear 0s 1;
        }

        @keyframes jump {
          0% {
            margin-top: 0;
          }
          50% {
            margin-top: -32px;
          }
          100% {
            margin-top: 0;
          }
        }
      </style>
      
      <main id="card">
        <section id="front" class="flip-card-front card">
            <header class="banner"><slot name="banner-text">Category</slot></header>
            <main>
              <slot name="front_title">
                <h1>Card Title</h1>
              </slot>
              <slot name="front_content">
                <ol>
                  <li>Assign an element to the "front_content" slot</li>
                  <li>Reload the page!</li>
                </ol>
              </slot>
            </main>
            <button class="flip-button" @click=${this.flip}>
							<span class="flip-button-icon"></span>
						</button>
        </section>

        <section id="back" class="flip-card-back card">
          <header class="banner"><slot name="banner-text_back">Category</slot></header>
          <main>
            <slot name="back_title">
              <h1>Back Side Title</h1>
            </slot>
            <slot name="back_content">
              <ul>
                <li>More content can go in the "back_content" slot</li>
                <li>Add some stuff!</li>
              </ul>
            </slot>
          </main>
          <button class="flip-button" @click=${this.flip}>
						<span class="flip-button-icon"></span>
					</button>
        </section>
      </main>
    `;
  }

  constructor() {
    super();
    this.cardHeight = '0px';
    this._bannerTextColour = '#ffffff';
    this._bannerBackgroundColour = '#000000';
    this._mainBackgroundColour = '#ffffff';
    this._mainTextColour = '#000000';
    this.accent = 'rgb(255, 212, 45)';
  }

  firstUpdated(changedProperties) {
    this.resize();
  }

  static get properties() {
    return {
      cardHeight: {
        type: String,
        reflect: false
      },

      accent: {
        type: String,
        reflect: true
      },

      accentShadow: {
        type: String,
        reflect: true
      }
    };
  }

  flip(e) {
    this.toggleAttribute('facedown');

    let card = this.shadowRoot.getElementById('card');
    card.classList.add('animateJump');
    card.addEventListener('animationend', () => {
      card.classList.remove('animateJump');
    });
  }

  /**
   * Recalculate the size of the card based on the content.
   */
  resize() {
    let frontSide = this.shadowRoot.getElementById('front');
    let backSide = this.shadowRoot.getElementById('back');
    let largestHeight = Math.max(frontSide.offsetHeight, backSide.offsetHeight) + 'px';

    frontSide.style.height = largestHeight;
    backSide.style.height = largestHeight;
    this.cardHeight = largestHeight;  
    this.shadowRoot.getElementById('card').style.height = largestHeight;
    this.requestUpdate();
  }
}

window.customElements.define('flip-card', FlipCard);
