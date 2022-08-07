import React, { forwardRef } from 'react';
import { Card, Button } from 'antd';
const DissolutionComponent = forwardRef((props, ref) => {
	return (
		<Card className='card-boxShadow'>
			<Dissolution
				data={data.data}
				ref={formRef}
				current={current}
				// onFinishScreen={(val) => handleSetDissolutionStep(val)}
			/>

			{current === 2 ? renderPrewviewForm(formRef) : ''}

			<div className={'card-boxShadow'} style={{ position: 'sticky', bottom: 0 }}>
				{current > 0 && <Button onClick={Prev}>Quay lại</Button>}

				{current < 2 && <Button onClick={Next}>Tiếp tục</Button>}
				{current === 2 && (
					<>
						<Button loading={loading} onClick={handleSaveDissolution}>
							Lưu lại
						</Button>
						<Button loading={loading} onClick={handlePurchaseDissolution}>
							Thanh toán
						</Button>
					</>
				)}
			</div>
		</Card>
	);
});
