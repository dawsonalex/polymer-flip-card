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
          border-right: 4px solid var(--accent, rgb(255, 212, 45));
          border-bottom: 4px solid var(--accent, rgb(255, 212, 45));
          border-left: 4px solid var(--accent, rgb(255, 212, 45));
          border-top: 4px solid var(--accent, rgb(255, 212, 45));
          border-radius: 10px 10px 10px 10px;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
          transition: transform 0.5s ease-in-out;
					overflow: hidden;

					padding-bottom: 32px;
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

					border: 4px solid var(--accent, rgb(255, 212, 45));;
					background: var(--accent, rgb(255, 212, 45));;
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

					color: var(--flipButtonColour, #000);
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
            <slot name="front-content">Front side content!</slot>
            <button class="flip-button" @click=${() => this.toggleAttribute('facedown')}>
							<span class="flip-button-icon"></span>
						</button>
        </section>

        <section id="back" class="flip-card-back card">
					<slot name="back-content">Back side content!</slot>
          <button class="flip-button" @click=${() => this.toggleAttribute('facedown')}>
						<span class="flip-button-icon"></span>
					</button>
        </section>
      </main>
    `;
  }

  constructor() {
    super();
    this.cardHeight = '0px';
		this.facedown = false;
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

			facedown: {
				type: Boolean,
				relfect: true
			}
    };
  }

	attributeChangedCallback(name, oldval, newval) {
		super.attributeChangedCallback(name, oldval, newval);
		switch(name) {
			case 'facedown':
				this.flip();
				break;
			default:
				break;
		}
  }

  flip(e) {
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
