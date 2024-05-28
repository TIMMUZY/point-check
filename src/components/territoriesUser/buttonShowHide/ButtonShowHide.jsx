import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import { Arrow } from '../../../utilits/icon/arrow'

export default function ButtonShowHide({ openList, setOpenList }) {
  return (
    <BtnText
      classes={[
        stylesBtnText.btnTextBig,
        stylesBtnText.colorHighlightLight,
        stylesBtnText.width100,
      ]}
      icon={openList ? <Arrow /> : <ArrowRight />}
      onClick={() => setOpenList(!openList)}
    >
      {openList ? 'Скрыть' : 'Смотреть все'}
    </BtnText>
  )
}
