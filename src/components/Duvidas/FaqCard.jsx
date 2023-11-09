import React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Button from '@mui/material/Button';

export const DuvidasCard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Accordion defaultActiveKey="" flush className="container pt-1">
        <Accordion.Item eventKey="0" className="mt-3 p-4">
          <Accordion.Header>Problema para realizar o login?</Accordion.Header>
          <Accordion.Body>
            <span>
              Para realizar login no PharmaSellticos Marketplace o usuário deverá
              preencher um e-mail válido (obrigatório ter o '@') e da extensão
              '.com' ou '.com.br' (ou outra da sua organização). Além disso, no
              campo "Senha" é necessário informar uma senha com no mínimo 8
              caracteres. Para sua segurança utilize letras, números e evite dados
              pessoais (como nome, data de nascimento, etc.).
            </span>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="mt-3 mb-6 p-4">
          <Accordion.Header>Não lembra quais medicamentos comprou?</Accordion.Header>
          <Accordion.Body>
            <span>Na PharmaSellticos Marketplace, você pode realizar o seu login e
              ir até o menu "Minhas Compras", que achará todas as suas compras seradas
              pelo dia da compra e ao clicar no dia desejado, o detalhamento aparecerá
              ao lado. Caso ainda tenha duvidas sobre a compra realizada, entre em contato
              com o nosso suporte (SAC - 0800 555 1234).   </span>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="mt-3 mb-5 p-4">
          <Accordion.Header>Política de devolução de medicamentos</Accordion.Header>
          <Accordion.Body>
            <span>Na PharmaSellticos Marketplace, permite que você devolva os produtos
              comprados em até 7 dias corridos após o recebimento do pedido. Para
              isso, o produto deve estar em sua embalagem original, sem indícios de
              uso, sem violação do lacre original do fabricante, acompanhado de sua
              nota fiscal. Entre em contato com o nosso suporte ao cliente (SAC - 0800 555 1234) e
              inicie o processo de devolução.
            </span>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button
        className="m-5 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        style={{ backgroundColor: 'rgb(32,193,148)' }}
        onClick={() => {
          navigate('/');
        }}
      >
        Acesse o Sistema
      </Button>
    </div>

  );
};
